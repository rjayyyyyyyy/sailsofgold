export interface ILauncherConfig {
    hasMysteryJackpot: boolean;
    hasGuaranteedJackpot: boolean;
    jackpots: any;
    disableSwipeToFullscreenPortraitIos: boolean;
    disableSwipeToFullscreenLandscapeIos: boolean;
    disableSwipeToFullscreenIos: boolean;
    swipeToHideIosBlacklist: string;
    defaultHyperSpin: boolean;
    disableHyperSpin: boolean;
    disableVideoActivationScreen: boolean;
    alwaysShowDecimals: boolean;
    useExternalBalanceOnly: boolean;
    disableScrollToFullscreenMessage: boolean;
    bundleMode: number;
    disableInGameModals: boolean;
    disableInGameFreeGamesModals: boolean;
    disableFastplay: boolean;
    unsupportedDeviceMessage: string;
    jackpotNotifications: boolean;
    bgColor: string;
    hideExit: boolean;
    hideHelp: boolean;
    hideHistory: boolean;
    hideFastplay: boolean;
    hideLobby: boolean;
    hideSound: boolean;
    hideAutoAdjustBet: boolean;
    hideSpaceBarToSpin: boolean;
    disableHistory: boolean;
    disableHelp: boolean;
    disableSound: boolean;
    enforceRoundTime: boolean;
    spinLimitEnabled: boolean;
    spinLimitInterval: number;
    spinLimitExpectedSpinTime: number;
    spinLimitMinCooloffTime: number;
    spinLimitMaxCooloffTime: number;
    spinLimitFixedCooloffTime: number;
    spinLimitDisplayCooloff: number;
    spinLimitDisplayIdleTimeCountdown: number;
    spinLimitIdleTimeCountdownThreshold: number;
    spinLimitRoundIdleTimeEnabled: boolean;
    spinLimitRoundIdleTimeTimerThreshold: number;
    regularSpinTime: number;
    autoPlayResume: boolean;
    disableSpacebarToSpin: boolean;
    resourceLevel: number;
    videoLevel: number;
    betMaxMode: number;
    betMaxSpin: boolean;
    disableExitInRound: boolean;
    cId: number;
    defaultFastPlay: boolean;
    defaultSpacebarToSpin: boolean;
    defaultSound: boolean;
    disableFastplayQuestion: boolean;
    disableVideo: boolean;
    requiredPlatformFeatureSupport: string;
    debug: boolean;
    debugAlert: boolean;
    fullScreenMode: boolean;
    defaultAutoAdjustBet: boolean;
    defaultAutoSpins: number;
    autoSpins: string;
    mobileGameHistoryUrl: string;
    gameModules: { [key: string]: { script: string; resource: string } };
    useBrowserStorage: number;
    availableModules: any[];
    gameURL: string;
    desktopGameHistoryUrl: string;
    hasInGameJackpots: boolean;
    hasFreeInGameJackpots: boolean;
    enforceShowGameName: boolean;
    disableMobileBlurHandling: boolean;
    integrationErrorCodes: { [key: string]: string };
    autoplayReset: boolean;
    autoplayLimits: boolean;
    resourceRoot: string;
    showSplash: boolean;
    loaderMinShowDuration: number;
    realityCheck: number;
    hasJackpots: boolean;
    showClientVersionInHelp: boolean;
    showFFGamesVersionInHelp: boolean;
    disableAutoplay: boolean;
    enforceAutoplayStopAtFreeSpins: boolean;
    enforceAutoplayStopAtBonus: boolean;
    betLossPresentation: boolean;
    waterMark: boolean;
    displayClock: boolean;
    useServerTime: boolean;
    rCmga: number;
    minRoundTime: number;
    detailedFreegameMessage: boolean;
    creditDisplay: number;
    pingIncreaseInterval: number;
    minPingTime: number;
    maxPingTime: number | null;
    baccaratHistory: number;
    gameRoundBalanceCheck: boolean;
    quickStopEnabled: boolean;
    neverGamble: boolean;
    autoHold: boolean;
    denom: number;
    brand: string;
    defaultLimit: number;
    freeGameEndLogout: boolean;
    lines: number;
    mjcongratulations: string;
    mjprizes: string;
    mjnames: string;
    freeSpinLimit: number;
    sessionId: string;
    currency: string;
    externalId: string;
    serverTime: string;
    serverTimeDelta: string;
    webp: boolean;
    jp2: boolean;
    server: string;
    channel: string;
    practice: number;
    baseURL: string;
    showPoweredBy: boolean;
    language: string;
    gameId: number;
    pId: number;
    fullScreen: boolean;
    autoPreventDefault: boolean;
    deviceType: string;
    exitHandlerMode: string;
    login: string;
    pwd: string;
    gameContainer: string;
    langPath: string;
    historyUrl: string;
    loadSoundAsync: number;
    quickStop: boolean;
}


export const sampleConfig: ILauncherConfig = {
    hasMysteryJackpot: false,
    hasGuaranteedJackpot: false,
    jackpots: null,
    disableSwipeToFullscreenPortraitIos: false,
    disableSwipeToFullscreenLandscapeIos: false,
    disableSwipeToFullscreenIos: false,
    swipeToHideIosBlacklist: "{15}",
    defaultHyperSpin: false,
    disableHyperSpin: true,
    disableVideoActivationScreen: false,
    alwaysShowDecimals: false,
    useExternalBalanceOnly: false,
    disableScrollToFullscreenMessage: false,
    bundleMode: 0,
    disableInGameModals: false,
    disableInGameFreeGamesModals: false,
    disableFastplay: false,
    unsupportedDeviceMessage: "This game is currently not supported by your device.",
    jackpotNotifications: true,
    bgColor: "green",
    hideExit: false,
    hideHelp: false,
    hideHistory: false,
    hideFastplay: false,
    hideLobby: false,
    hideSound: false,
    hideAutoAdjustBet: false,
    hideSpaceBarToSpin: false,
    disableHistory: false,
    disableHelp: false,
    disableSound: false,
    enforceRoundTime: false,
    spinLimitEnabled: false,
    spinLimitInterval: 0,
    spinLimitExpectedSpinTime: 0,
    spinLimitMinCooloffTime: 0,
    spinLimitMaxCooloffTime: 0,
    spinLimitFixedCooloffTime: 0,
    spinLimitDisplayCooloff: 0,
    spinLimitDisplayIdleTimeCountdown: 0,
    spinLimitIdleTimeCountdownThreshold: 0,
    spinLimitRoundIdleTimeEnabled: false,
    spinLimitRoundIdleTimeTimerThreshold: 3000,
    regularSpinTime: 2500,
    autoPlayResume: false,
    disableSpacebarToSpin: true,
    resourceLevel: 2,
    videoLevel: 2,
    betMaxMode: 0,
    betMaxSpin: false,
    disableExitInRound: false,
    cId: 1726,
    defaultFastPlay: false,
    defaultSpacebarToSpin: true,
    defaultSound: true,
    disableFastplayQuestion: false,
    disableVideo: false,
    requiredPlatformFeatureSupport: "StencilBuffer,EnforceHardwareAcceleration",
    debug: false,
    debugAlert: false,
    fullScreenMode: true,
    defaultAutoAdjustBet: true,
    defaultAutoSpins: 50,
    autoSpins: "10,20,50,75,100",
    mobileGameHistoryUrl: "/CasinoHistoryMobile",
    gameModules: {
        "bundleconfig": {
            "script": "",
            "resource": "resources/games/videoslot/bookofdead/config_${CHANNEL}.json"
        },
        "featurepreview": {
            "script": "",
            "resource": "resources/games/videoslot/bookofdead/featurepreview_bundle.json"
        },
        "game": {
            "script": "",
            "resource": "resources/games/videoslot/bookofdead/game_bundle.json"
        },
        "ui": {
            "script": "games/videoslot/bookofdead/ui/desktop/bookofdead_viewfactory.js",
            "resource": "resources/games/videoslot/bookofdead/ui_${CHANNEL}_bundle.json"
        },
        "mysteryjackpot": {
            "script": "",
            "resource": "resources/games/videoslot/bookofdead/mysteryjackpot_bundle.json"
        }
    },
    useBrowserStorage: 0,
    availableModules: [],
    gameURL: "games/videoslot/bookofdead/bookofdead_main.js",
    desktopGameHistoryUrl: "/CasinoHistory",
    hasInGameJackpots: false,
    hasFreeInGameJackpots: false,
    enforceShowGameName: false,
    disableMobileBlurHandling: false,
    integrationErrorCodes: {
        "IDS_IERR_UNKNOWN": "Internal error",
        "IDS_IERR_UNKNOWNUSER": "User unknown",
        "IDS_IERR_INTERNAL": "Internal error",
        "IDS_IERR_INVALIDCURRENCY": "Unknown currency",
        "IDS_IERR_WRONGUSERNAMEPASSWORD": "Unable to authenticate user",
        "IDS_IERR_ACCOUNTLOCKED": "Account is locked",
        "IDS_IERR_ACCOUNTDISABLED": "Account is disabled",
        "IDS_IERR_NOTENOUGHMONEY": "There isn't enough funds on the account",
        "IDS_IERR_MAXCONCURRENTCALLS": "The system is currently under heavy load. Please try again later",
        "IDS_IERR_SPENDINGBUDGETEXCEEDED": "Your spending budget has been reached.",
        "IDS_IERR_SESSIONEXPIRED": "Session has expired. Please restart the game",
        "IDS_IERR_TIMEBUDGETEXCEEDED": "Your time budget has been reached",
        "IDS_IERR_SERVICEUNAVAILABLE": "The system is temporarily unavailable. Please try again later",
        "IDS_IERR_INVALIDIPLOCATION": "You are logging in from a restricted location. Your login has been denied.",
        "IDS_IERR_USERISUNDERAGE": "You are blocked from playing these games due to being underage. If you have any questions please contact your customer support",
        "IDS_IERR_SESSIONLIMITEXCEEDED": "Your session limit has been reached. Please exit the game and start a new game session to continue playing."
    },
    autoplayReset: false,
    autoplayLimits: false,
    resourceRoot: "https://localhost:44321/content/6.0.0-bookofdead.238/",
    showSplash: true,
    loaderMinShowDuration: 0,
    realityCheck: 0,
    hasJackpots: false,
    showClientVersionInHelp: false,
    showFFGamesVersionInHelp: false,
    disableAutoplay: false,
    enforceAutoplayStopAtFreeSpins: false,
    enforceAutoplayStopAtBonus: false,
    betLossPresentation: false,
    waterMark: false,
    displayClock: false,
    useServerTime: false,
    rCmga: 0,
    minRoundTime: 1000,
    detailedFreegameMessage: false,
    creditDisplay: 0,
    pingIncreaseInterval: 0,
    minPingTime: 0,
    maxPingTime: null,
    baccaratHistory: 7,
    gameRoundBalanceCheck: false,
    quickStopEnabled: true,
    neverGamble: false,
    autoHold: false,
    denom: 20,
    brand: "common",
    defaultLimit: 1,
    freeGameEndLogout: false,
    lines: 10,
    mjcongratulations: ";",
    mjprizes: ",,,",
    mjnames: "Mini,Minor,Major,Grand",
    freeSpinLimit: 0,
    sessionId: "mRQJ9YYOoxc!1726",
    currency: "EUR",
    externalId: "v",
    serverTime: "2025-09-20T06:49:54Z",
    serverTimeDelta: "-145434",
    webp: true,
    jp2: false,
    server: "https://ff.lydrst.com/",
    channel: "mobile",
    practice: 0,
    baseURL: "https://localhost:44321/content/6.0.0-bookofdead.238/",
    showPoweredBy: true,
    language: "en_US",
    gameId: 310,
    pId: 8872,
    fullScreen: false,
    autoPreventDefault: true,
    deviceType: "mobile",
    exitHandlerMode: "redirect",
    login: "v",
    pwd: "123",
    gameContainer: "gameWrapper",
    langPath: "resources/lang/en_GB/locale.json",
    historyUrl: "/CasinoHistoryMobile?pid=2&lang=en_GB&gameid=100310",
    loadSoundAsync: 1,
    quickStop: true
}