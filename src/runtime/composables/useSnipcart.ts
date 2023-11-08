import { useNuxtApp, useState } from "#imports"
import { watch } from "vue"
import cloneDeep from "lodash-es/cloneDeep"
import { SnipcartSDK } from "../../types"

interface Map {
    [key: string]: string
}

export const useSnipcart = () => {

    /**
     * @description the actual snipcart install
     */
    const snipcart = useState<SnipcartSDK | null>('snipcart', () => null)
    /**
     * @description  you can watch to this boolean if you want to be sure snipcart is available
     */
    const isReady = useState(() => false)
    /**
     * @description This can cause performance hit. It's working but receive multiple events on changes. Not sure why
     */
    const store = useState("store", () => null)
    /**
     * @description if you are using subscription settings in your snipcart. You can manually unsubscribe using this
     */
    const offStore = useState("offStore", () => ({}))
    const nuxtApp = useNuxtApp()

    /**
     * 
     * @param bindProductItemCustom  an Object of key value that will represent your product custom fields.
     * @returns Object data-item-custom* that you will be able to bind into html element
     */
    const bindProductItemCustom = (bindProductItemCustom: any) => {
        const fields : Map = {}
    
        bindProductItemCustom.forEach((field : any, index: string) => {
            if (typeof field !== 'object') {
                throw new TypeError('each bindProductItemCustom field should be an object')
            }
            Object.keys(field).forEach((key) => {
                const fieldKey = `data-item-custom${index + 1}-${key.toString().toLowerCase()}`
                fields[fieldKey] = field[key]
            })
        })
        return fields
    }

    /**
     * 
     * @param product an Object of key value that will represent your product.
     * @returns Object data-item-* that you will be able to bind into html element
     */
    const bindProductItem = (product: any) => {
        const fields : Map = {}
    
        if (typeof product !== 'object') {
            throw new TypeError('Product should be an object')
        }
    
        Object.keys(product).forEach((key: any) => {
            fields[`data-item-${key.toString().toLowerCase()}`] = product[key]
        })
        return fields
    }

    /**
     * 
     * @param currency the current to switch on
     * @returns void
     */
    const setCurrency = async (currency: string) => {
        if (!snipcart.value) return console.error("setCurrency - snipcart is not yet ready")
        snipcart.value.api.session.setCurrency(currency)
    }

    /**
     * 
     * @param lang the lang you want to switch
     * @param _translations the override translations you want to send at runtime. This will override the translations given during the init
     * @returns void
     */
    const setLanguage = async (lang: string, _translations = {}) => {
        if (!snipcart.value) return console.error("setLanguage - snipcart is not ready")

        const { translations } = nuxtApp.$config.public.snipcart
        const finalTranslations = {
            ...(translations ? translations[lang] : {}),
            ..._translations
        }
        snipcart.value.api.session.setLanguage(lang, finalTranslations)
    }

    /**
     * @description use it to manually load snipcart
     */
    const load = () => {
        if (process.server) throw("can't load snipcart on server side")
        window.LoadSnipcart()
    }

    nuxtApp.hook("app:mounted", () => {
        if (nuxtApp.$config.public.snipcart.subscription) {
            watch(isReady, (newVal, oldVal) => {
                if (oldVal == false && newVal == true) {
                    offStore.value = window.Snipcart.store.subscribe(() => {
                        const currentValue = window.Snipcart.store.getState()
                        const oldStore = cloneDeep(store.value)
                        if (oldStore != currentValue) {
                            store.value = currentValue
                        }
                    })
                }
            })
        }

    })

    return {
        load,
        bindProductItem,
        bindProductItemCustom,
        setCurrency,
        setLanguage,
        snipcart,
        isReady,
        store,
        offStore
    }
}