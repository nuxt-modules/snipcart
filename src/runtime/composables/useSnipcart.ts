import { ModuleOptions } from "@nuxt/schema"

interface Map {
    [key: string]: string
}

export const useSnipcart = () => {

    const customFields = (customFields: any) => {
        const fields : Map = {}
    
        customFields.forEach((field : any, index: string) => {
            if (typeof field !== 'object') {
                throw new TypeError('each customFields field should be an object')
            }
            Object.keys(field).forEach((key) => {
                const fieldKey = `data-item-custom${index + 1}-${key.toString().toLowerCase()}`
                fields[fieldKey] = field[key]
            })
        })
        return fields
    }

    const getInstance = () => {
        if (!process.client) {
            console.error("it looks you are trying to call this function on the server")
        }
        if (!window.Snipcart) {
            console.error("it looks snipcart is still not loaded make sure you have loaded the JS")
        }
        return window.Snipcart
    }

    const bindProduct = (product: any) => {
        const fields : Map = {}
    
        if (typeof product !== 'object') {
            throw new TypeError('Product should be an object')
        }
    
        Object.keys(product).forEach((key: any) => {
            fields[`data-item-${key.toString().toLowerCase()}`] = product[key]
        })
        return fields
    }

    const setCurrency = (currency: string) => {
        getInstance().api.session.setCurrency(currency)
    }

    const setLanguage = (lang: string, options = {}) => {
        getInstance().api.session.setLanguage(lang, options)
    }

    const getSettings = () => {
        if (!process.client) {
            console.error("it looks you are trying to call this function on the server")
        }
        
        return window.SnipcartSettings as ModuleOptions
    }

    return {
        bindProduct,
        getInstance,
        customFields,
        getSettings,
        setCurrency,
        setLanguage
    }
}