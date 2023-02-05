```js
const initBackwardCompatibility = (t: HTMLElement) => {
    const settings = window.SnipcartSettings
    if (settings.isBeforeV3_4) {
        t.dataset.apiKey = settings.publicApiKey;
        if(settings.addProductBehavior) {
            t.dataset.configAddProductBehavior = settings.addProductBehavior;
        }
        if (settings.addProductBehavior) {
            t.dataset.configAddProductBehavior = settings.addProductBehavior
        }
        if (settings.modalStyle) {
            t.dataset.configModalStyle = settings.modalStyle
        }
        if (settings.currency) {
            t.dataset.currency = settings.currency
        }
        if (settings.templatesUrl) {
            t.dataset.templatesUrl = settings.templatesUrl
        }
    }

    return t
}

const LoadSnipcart = () => {
    const settings = window.SnipcartSettings
    if (settings.isLoaded) {
      return;
    }

    settings.isLoaded = true;
  
    const head = document.getElementsByTagName("head")[0];
    var snipcart = <HTMLElement>document.querySelector("#snipcart");
    var snipcartJS = <HTMLScriptElement>document.querySelector(`src[src^="${settings.protocol}://${settings.domain}"][src$="snipcart.js"]`);
    let snipcartCSS = <HTMLLinkElement>document.querySelector(`link[href^="${settings.protocol}://${settings.domain}"][href$="snipcart.css"]`);

    if (!snipcart) {
        snipcart = document.createElement("div");
        snipcart.id = "snipcart";
        snipcart.setAttribute("hidden", "true");
        document.body.appendChild(snipcart);
    }

    snipcart = initBackwardCompatibility(snipcart);

    if (!snipcartJS) {
        snipcartJS = document.createElement("script");
        snipcartJS.src = `${settings.protocol}://${settings.domain}/themes/v${settings.version}/default/snipcart.js`;
        snipcartJS.async = true;
        head.appendChild(snipcartJS);
    }

    if (!snipcartCSS && settings.loadCSS) {
        snipcartCSS = document.createElement("link");
        snipcartCSS.rel = "stylesheet";
        snipcartCSS.type = "text/css";
        snipcartCSS.href = `${settings.protocol}://${settings.domain}/themes/v${settings.version}/default/snipcart.css`;
        head.prepend(snipcartCSS);
    }

    settings.events?.forEach(function(eventType) {
        document.removeEventListener(eventType, <EventListenerOrEventListenerObject>settings.LoadSnipcart);
    });
}

const readySnipcart = () => {
    const settings = window.SnipcartSettings 
    if (settings.loadStrategy) {
        if (settings.loadStrategy === "on-user-interaction") {
            settings.events?.forEach(function(event) {
                document.addEventListener(event, <EventListenerOrEventListenerObject>settings.LoadSnipcart);
            });
            setTimeout(<TimerHandler>settings.LoadSnipcart, settings.timeoutDuration);
        }
    } else {
        if (settings.LoadSnipcart) {
            settings.LoadSnipcart();
        }
    }
}
```