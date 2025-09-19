export enum ClientCommand {
    Poll = 0,
	Spin=1,
	Feature = 2,
	Gamble = 4,
    FreeSpin = 7,
    BuyinStatus = 52,
    FreeGame = 81,
    FreeGameEnd = 82,
    GetMoney = 100,
    Login = 101,
    Logout = 102,
    RequestSession = 103,
    NewSPGame = 104,
    GetNumPlayersOnline = 105,
    JoinMPGame = 107,
    LeaveMPGame = 108,
    ServerMessageResponse = 125,
    Time = 127,
    IntegrationData = 128,
    CoolOff = 129,
};

export enum ServerCommand {
    Poll = 0,
	Spin = 1,
	Feature = 2,
	SpinEnd = 3,
	Gamble = 4,
	Payout = 6,
    CapLimit = 49,
    BuyinStatus = 52,
    BetLimits = 53,
    Denominations = 54,
    JackpotData = 55,
    InterRoundData = 56,
    CustomData = 57,
    JackpotNotification = 58,
    GameMode = 59,
    Setup = 60,
    FreeGame = 81,
    FreeGameEnd = 82,
    FreeSpin = 83,
    ReserveFailure = 90,
    GameSession = 91,
    GetMoneyAnswer = 100,
    LoginAnswer = 101,
    LogoutAnswer = 102,
    NewSessionId = 103,
    NewSPGameStarted = 104,
    NumPlayersOnline = 105,
    SeatInfo = 106,
    MPGameJoined = 107,
    EndOfHistory = 109,
    CriticalError = 111,
    IllegalSessionId = 113,
    ServerMessage = 125,
    Time = 127,
    CoolOff = 128,
    RandomNumberUsed = 10000,
    RandomizerManipulationMode = 10001,
    GameResult = 20000
};

/** Stores and converts command data. Each command consists of a type and a various length of data. */
export class Command
{
	private static _domParser: DOMParser = new DOMParser();
	private _type: number;
	private _data: string[];

	/** Returns command type. */
	public get type(): number
	{
		return this._type;
	}

	/** Returns command length. */
	public get length(): number
	{
		return this._data ? this._data.length : 0;
	}

	/** Creates new Command instance. */
	constructor(type: number, data: string[])
	{
		this._type = type;
		this._data = data;
	}

	public getData() {
		return this._data;
	}

	/** Returns the number from the given index of the data, or the default value. */
	public getInt(index: number, defValue: number = 0): number
	{
		return this._data.length > index ? parseInt(this._data[index]) : defValue;
	}

	/** Returns the string from the given index of the data, or the default value. */
	public getString(index: number, defValue: string = ""): string
	{
		return this._data.length > index ? this._data[index] : defValue;
	}

	/** Returns the boolean from the given index of the data (from strins 1 and 0), or the default value. */
	public getBoolean(index: number, defValue: boolean = false): boolean
	{
		return this._data.length > index ? this._data[index] !== "0" : defValue;
	}

	/** Returns parsed XML from the given index of the data. */
	public getXML(index: number): XMLDocument
	{
		const xmlStr = this.getString(index, "");
		const xml: XMLDocument = Command._domParser.parseFromString(xmlStr, "text/xml");
		return xml;
	}

	/** Returns an array filled with strings from the given index of the data or the default value with the length requested. */
	public getStrArray(index: number, length: number, defValue: string = ""): string[]
	{
		const ret: string[] = [];
		for (let i = index, j = index + length; i < j; i++)
		{
			ret.push(this.getString(i, defValue));
		}
		return ret;
	}

	/** Returns an array filled with numbers from the given index of the data or the default value with the length requested. */
	public getIntArray(idx: number, length: number, defValue: number = 0): number[]
	{
		let ret: number[] = [];
		for (let i: number = 0; i < length; i++)
		{
			ret.push(this.getInt(idx + i, defValue));
		}
		return ret;
	}

	/** Returns formatted string representation of the data with escaped strings. */
	public toString(): string
	{
		let cmdStr: string = this._type.toString();
		for (let i: number = 0, j: number = this._data.length; i < j; i++)
		{
			const str: string = this._data[i];

			// Escape the string if needed
			if (str.indexOf(" ") > -1 || str.indexOf("\"") > -1)
			{
				cmdStr += " \"" + encodeURIComponent(str) + "\"";
			}
			else
			{
				cmdStr += " " + str;
			}
		}
		return cmdStr;
	}
}