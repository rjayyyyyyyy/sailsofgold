import { NetworkEvent } from "../events/Dispatcher";
import Dispatcher from "../events/Dispatcher";

interface IHeader
{
	name: string;
	value: string;
}

export class Request
{
	public static readonly STATUS_OK: number = 200;
	public static readonly STATUS_NOT_FOUND: number = 404;
	public static readonly STATUS_TIMEOUT: number = 408;
	public static readonly METHOD_GET: string = "GET";
	public static readonly METHOD_POST: string = "POST";

	private static readonly STATE_UNSENT: number = 0;
	private static readonly STATE_OPENED: number = 1;
	private static readonly STATE_HEADERS_RECEIVED: number = 2;
	private static readonly STATE_LOADING: number = 3;
	private static readonly STATE_DONE: number = 4;
	private static readonly CONTENT_TYPE: string = "Content-type";
	private static readonly TEXT_PLAIN: string = "text/plain";

	/** Counter to have unique IDs. */
	private static _id: number = 0;

	/** Returns URL of the request. */
	get url(): string
	{
		return this._url;
	}

	private _url: string;
	private _timeoutSec: number;
	private _headers: IHeader[];
	private _xhr: XMLHttpRequest;
	private _id: number;
	private _dispatcher: Dispatcher;

	/**
	 * Creates new Request instance.
	 * @param url The URL to connect to.
	 * @param dispatcher The dispatcher instance.
	 * @param timeoutSec Timeout after this many seconds.
	 */
	constructor(url: string, dispatcher: Dispatcher, timeoutSec: number = 30)
	{

		this._url = url;
		this._dispatcher = dispatcher;
		this._timeoutSec = timeoutSec;
		this._headers = [];

		this._xhr = new XMLHttpRequest();
		this._xhr.onreadystatechange = () => this.stateChangeHandler();
		this._xhr.ontimeout = () => this.timeoutHandler();
	}

	/**
	 * Sends data to the specified URL, and waits for response.
	 * @param data The data to send to the server.
	 * @param returnMime Preferred mime type (experimental).
	 * @returns Unique event ID.
	 * @throws Error Connection already opened!
	 */
	public send(data: string = "", returnMime: string = ""): number
	{
		this._id = Request._id;
		Request._id++;

		if (this._xhr.readyState > 0)
		{
			throw new Error("Connection already opened!");
		}

		let method: string = Request.METHOD_GET;
		if (data.length > 0)
		{
			method = Request.METHOD_POST;
		}

		this._xhr.open(
			method,
			this._url,
			true
		);

		this._xhr.timeout = this._timeoutSec * 1000;

		let ctFound: boolean = false;
		for (let i = 0, j = this._headers.length; i < j; i++)
		{
			if (this._headers[i].name === Request.CONTENT_TYPE)
			{
				ctFound = true;
			}

			this._xhr.setRequestHeader(this._headers[i].name, this._headers[i].value);
		}

		if (!ctFound)
		{
			// Have to set on IPad2 and IPhone5C
			this._xhr.setRequestHeader(Request.CONTENT_TYPE, Request.TEXT_PLAIN);
		}

		if (returnMime.length > 0)
		{
			this._xhr.overrideMimeType(returnMime);
		}

		if (method === Request.METHOD_POST)
		{
			this._xhr.send(data);
		}
		else
		{
			this._xhr.send();
		}

		return this._id;
	}

	/**
	 * Adds header to the request. Can be used only before sending the request.
	 * @param name Header name.
	 * @param value Header value.
	 * @throws Error Can't add header, request already sent! (NAME: VALUE)
	 */
	public addHeader(name: string, value: string): void
	{
		if (this._xhr.readyState > Request.STATE_OPENED)
		{
			throw new Error("Can\'t add header, request already sent! (" + name + ": " + value + ")");
		}

		for (let i = 0, j = this._headers.length; i < j; i++)
		{
			if (this._headers[i].name === name && this._headers[i].value === value)
			{
				return;
			}
		}

		this._headers.push({
			name: name,
			value: value
		});

		if (this._xhr.readyState === Request.STATE_OPENED)
		{
			this._xhr.setRequestHeader(name, value);
		}
	}

	/**
	 * Removes header from the request. Can be used only before sending the request.
	 * @param name Header name.
	 * @param value Header value.
	 * @throws Error Can't remove header, request already opened! (NAME: VALUE)
	 */
	public removeHeader(name: string, value: string): void
	{
		if (this._xhr.readyState > Request.STATE_UNSENT)
		{
			throw new Error("Can\'t remove header, request already opened! (" + name + ": " + value + ")");
		}

		for (let i = 0, j = this._headers.length; i < j; i++)
		{
			if (this._headers[i].name === name && this._headers[i].value === value)
			{
				this._headers.splice(i, 1);

				return;
			}
		}
	}

	/** Aborts the request. */
	public abort(): void
	{
		this._xhr.abort();
	}

	/** XMLHttpRequest state change handler. */
	private stateChangeHandler(): void
	{
		if (this._xhr.readyState === Request.STATE_DONE)
		{
            this._dispatcher.emit(NetworkEvent.REQUEST_DATA, this._xhr.responseText);
		}
	}

	/** XMLHttpRequest timeout handler. */
	private timeoutHandler(): void
	{
		this._dispatcher.emit(NetworkEvent.REQUEST_ERROR, this._xhr.statusText);
	}
}