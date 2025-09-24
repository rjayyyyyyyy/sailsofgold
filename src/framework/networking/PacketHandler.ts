import { Command, ClientCommand } from "./Commands";
import Dispatcher, { CommandEvent, EVENTS, NetworkEvent, SystemEvent } from "../events/Dispatcher";


export class PacketHandler
{
	protected static readonly START: string = "d=";
	protected static readonly END: string = "\r\n";
	protected static readonly JOINER: string = " ";
	protected static readonly LATE_REPLY_MS: number = 5000;
	protected static readonly TIMEOUT_MS: number = 10000;
	protected static readonly ERROR_MS: number = 30000;

	protected _dispatcher: typeof Dispatcher;

	protected _separatorRe: RegExp;
	protected _typeRe: RegExp;
	protected _dataRe: RegExp;
	protected _sendQueue: string;
	protected _prevQueue: string;
	protected _packetId: number;
	protected _sessionId: string;
	protected _keepAlive: boolean;
	protected _lastSend: number;
	protected _pingTime: number;
	protected _minPingTime: number;
	protected _steady: boolean;
	protected _sending: boolean;
	protected _lateReply: boolean;
	protected _numTimeOuts: number;
	protected _numPings: number;
	protected _maxPingTime: number;
	protected _pingIncreaseInterval: number;
	protected _hadCommDelay: boolean;
	protected _enabled: boolean;
	// protected _onCommand: (e: CommandEvent) => void;

	/** Creates new PacketHandler instance. */
	constructor(keepAlive: boolean = true)
	{

		this._dispatcher = Dispatcher;
		this._keepAlive = keepAlive;

		this._dispatcher.addListener(CommandEvent.GAME_OUT, this.onCommand.bind(this));
		this._dispatcher.addListener(NetworkEvent.REQUEST_DATA, this.onPacket.bind(this));
		this._dispatcher.addListener(NetworkEvent.SIMULATE_REQUEST_DATA, this.onPacket.bind(this));
		this._dispatcher.addListener(NetworkEvent.CHANGE_SESSION_ID, this.onSessionResponse.bind(this));

		this._separatorRe = /\r?\n|\r/;
		this._typeRe = /^\d+/;
		this._dataRe = /(?: ([^"\s]+|(?:"(?:[^"\\]|\\.)*")))/g;
		this._packetId = 1; // We send two packets from GameLoader in CoreWeb so this should start at 3.
		this._sendQueue = "";
		this._prevQueue = "";
		this._sessionId = "0";
		this._lastSend = 0;
		this._minPingTime = 25000;
		this._pingTime = this._minPingTime;
		this._steady = true;
		this._sending = false;
		this._lateReply = false;
		this._numTimeOuts = 0;
		this._maxPingTime = 30000;
		this._numPings = 0;
		this._pingIncreaseInterval = 0;
		this._enabled = false;


		this._hadCommDelay = false;

		Dispatcher.addListener(EVENTS.LOAD_COMPLETE, () => {
			this.onStart();
		});

		Dispatcher.addListener(SystemEvent.TICK, this.onTick.bind(this));
	}

	/** Sets the maximum ping time in seconds. */
	public setMaxPingTime(maxTime: number): void
	{
		this._maxPingTime = maxTime * 1000;
	}

	/** Sets the minimum ping time in seconds. */
	public setMinPingTime(minTime: number, steady: boolean = true): void
	{
		this._steady = steady;

		if (minTime < 10)
		{
			minTime = 10;
		}
		if (minTime > 30)
		{
			minTime = 30;
		}

		this._pingTime =  minTime * 1000;
		this._minPingTime = minTime * 1000;
	}

	/** Sets increasing ping interval. Maximum interval is 5. */
	public setIncreasingPing(interval: number): void
	{
		if (interval > 5)
		{
			interval = 5;
		}

		this._pingIncreaseInterval = interval;
		if (this._steady)
		{
			this._pingTime = this._maxPingTime;
			this._minPingTime = this._maxPingTime;
		}
	}

	/** Enables communication. */
	protected onStart(): void
	{
		this._enabled = true;
	}

	/** Listens for PacketEvents, converts them to CommandEvents, and fires them through the central dispatcher. */
	protected onPacket(e: string): void
	{
		console.log("onPacket", e);
		this._sending = false;
		this._lateReply = false;
		this._numTimeOuts = 0;
		this._prevQueue = "";
		this._packetId++;

		// remove "d="
		const data = e.slice(PacketHandler.START.length);

		// last one is an empty string because of the packet terminating new line, see for loop below!
		const commands = data.split(this._separatorRe);

		let cmd: string;
		let type: number;
		let cmdData: string[];
		let match: string[];
		let command:Command;
		for (let i = 0, j = commands.length; i < j; i++)
		{
			cmd = commands[i];

			// skip empty lines often used in simulations, and because of the packet terminating newline
			if (cmd === "")
			{
				continue;
			}

			type = parseInt(cmd.match(this._typeRe)![0]);
			cmdData = [];

			// get all the extra data strings after command type
			while (match = this._dataRe.exec(cmd)!)
			{
				let val = match[1];
				if (val.length > 0 && (val.charAt(0) === '"' || val.charAt(0) === "'"))
				{
					val = val.substring(1, val.length - 1);
				}

				// TODO: unescape all escaped characters?
				val = val.replace(/\\"/g, '"');

				cmdData.push(val);
			}

			// reset regexp
			this._dataRe.lastIndex = 0;

			// emit received command to the logic
			command = new Command(type, cmdData);
			this._dispatcher.emit(CommandEvent.GAME_IN, command);
		}

		// if (this._hadCommDelay)
		// {
		// 	this._dispatcher.dispatch(new CommStatusEvent(CommStatusEvent.CLEAR_TIMEOUT));
		// 	this._hadCommDelay = false;
		// }
	}

	/** Listens for command sending requests, escapes and queues their data. */
	protected onCommand(e: Command): void
	{
		console.log("PacketHandler onCommand");
		const cmd = e;
		console.log("onCommand", e);

		let str: string = cmd.type.toString();

		for (let i: number = 0, j: number = cmd.length; i < j; i++)
		{
			let s = cmd.getString(i);
			if (s.indexOf(" ") > -1 || s.indexOf("\"") > -1)
			{
				str += PacketHandler.JOINER + "\"" + encodeURIComponent(s) + "\"";
			}
			else
			{
				str += PacketHandler.JOINER + s;
			}
		}

		str += PacketHandler.END;
		this._sendQueue += str;
	}

    // TODO: Implement session response and illegal session

	// /** Stores session ID used in communication starting packets. */
	protected onSessionResponse(e: string): void
	{
		this._sessionId = e;
	}

	// /** Clears session ID for further communication. */
	// protected onIllegalSession(e: SessionEvent): void
	// {
	// 	this._sessionId = "";
	// }

	/** Function called in an interval, sends request if needed, and updates ping timing. */
	protected onTick(): void
	{
		const time = performance.now();
		if (this._sending)
		{
			if (!this.onSendingTick(time))
			{
				return;
			}
		}
		else
		{
			this.onIdleTick(time);
		}

		this.send();
	}

	/**
	 * Function run when in sending state, handles late reply, timeout and communication error.
	 * @returns If a send call is needed.
	 */
	protected onSendingTick(time: number): boolean
	{
		// late reply handling
		if (time - this._lastSend > PacketHandler.LATE_REPLY_MS)
			{
				this._lateReply = true;
			}

		// timeout handling
		if (time - this._lastSend > PacketHandler.TIMEOUT_MS && !this._hadCommDelay && !isNaN(this._lastSend))
			{
				this._hadCommDelay = true;

			// inform UI
            // TODO: Implement
			// this._dispatcher.dispatch(new CommStatusEvent(CommStatusEvent.TIMEOUT));

			return false;
			}

		// error handling
		if (time - this._lastSend > PacketHandler.ERROR_MS)
			{
				this._numTimeOuts++;
				if (this._numTimeOuts >= 3)
				{
					// abort pending request (by sending empty data)
					this._sendQueue = "";
					this.send(true);

				// prevent more tries
					this._lastSend = NaN;

				// inform UI
                // TODO: Implement
				// this._dispatcher.dispatch(new CommStatusEvent(CommStatusEvent.ERROR));

				return false;
				}

				// resend data
				this._sendQueue = this._prevQueue + this._sendQueue;
				this._sending = false;
			}

		return true;
		}

	/** Function run when in idle state, handles pinging. Writes to queue, if pinging is needed. */
	protected onIdleTick(time: number): void
		{
			if (this._sendQueue.length > 0)
			{
				this._pingTime = this._minPingTime;
				this._numPings = 0;
			}

			if (this._sendQueue === "" && this._sessionId && this._sessionId.length > 0 && this._keepAlive)
			{
				if (time - this._lastSend > this._pingTime)
				{
				this._sendQueue = ClientCommand.Poll.toString() + PacketHandler.END;
					this._numPings++;

					if (!this._steady && this._numPings === this._pingIncreaseInterval)
					{
					this._pingTime *= 2;
						if (this._pingTime > this._maxPingTime)
						{
							this._pingTime = this._maxPingTime;
						}

						this._numPings = 0;
					}
				}
			}
		}

	/** Checks, if the current queue is needed to be sent. */
	protected send(force: boolean = false): void
	{
		if (this._enabled)
		{
			if (this._sendQueue.length > 0 && !this._sending || force)
			{
				this._sending = true;
				this._prevQueue = this._sendQueue;
				this._sendQueue = "";

				let data: string | null = PacketHandler.START + this._packetId + PacketHandler.END;
				data += this._sessionId + PacketHandler.END;

				if (this._prevQueue)
				{
					data += this._prevQueue;
				}
				else
				{
					data = null;
				}

                // TODO: Implement
				this._dispatcher.emit(NetworkEvent.CLIENT_PACKET, data);

				this._lastSend = performance.now();

				// TODO: Implement
				// if (this._hadCommDelay)
				// {
				// 	 this._dispatcher.dispatch(new CommStatusEvent(CommStatusEvent.CLEAR_TIMEOUT));
				// 	 this._hadCommDelay = false;
				// }
			}
		}
	}

	/** Reconnect end listener. Sending data to the server is prevented while in reconnect mode. */
	// protected onReconnectEnd(): void
	// {
	// 	if (this._onCommand)
	// 	{
	// 		this._dispatcher.addEventListener(CommandEvent.LOGIC_OUT, this._onCommand);
	// 		this._onCommand = null;
	// 	}
	// }
}