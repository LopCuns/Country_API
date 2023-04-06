import {$} from '../scripts/lib.js'

async function main(){
    const main = $.id('main'),
    searchForm = $.id('search'),
    searchInput = $.id('searchInput'),
    errorMsg = $.id('errorMsg'),
    loader = $.id('loader')
    const setCountryData = (data)=>{
        const template = $.id('countryTemplate').content.cloneNode(true),
        countryElement = $.query(template,'.country'),
        fragment = $.frag(),
        setCtrEl = (cl,txt) => $.setContent($.query(countryElement,`.country__info__${cl}`),txt)

        $.setImage($.query(countryElement,'.country__flags__mainFlag'),data.flags.svg,data.flags.alt)
        $.setImage($.query(countryElement,'.country__flags__coatOfArms'),data.coatOfArms.svg,data.coatOfArms.svg ? `coat of arms from ${data.name.official}`:"")
        setCtrEl('offiname',data.name.nativeName[Object.keys(data.name.nativeName)[0]].official)
        setCtrEl('commname',data.name.nativeName[Object.keys(data.name.nativeName)[0]].common)
        setCtrEl('capital',data.capital[0])
        setCtrEl('lang',Object.values(data.languages).join(','))
        setCtrEl('region',`${data.region},${data.subregion}`)
        setCtrEl('population',data.population)
        setCtrEl('ccTLD',data.tld[0])
        $.setLink($.query(countryElement,'.country__info__map__link'),data.maps.googleMaps,data.maps.googleMaps)

        fragment.append(countryElement)
        main.append(fragment)
        $.hide(loader)
        
    }
    async function buildContry(cname){
        $.hide(errorMsg)
        $.show(loader)
        const data  = await $.toFetchCountry(cname)
        if(data.status === 404){
            $.hide(loader)
            $.show(errorMsg)
            return
        }
        $.hide(errorMsg)
        data.forEach(countryData => setCountryData(countryData))
    }
    $.ev(searchForm,'submit',(e)=>{
        e.preventDefault()
        main.textContent = ""
        buildContry(searchInput.value)
        searchInput.value = ""
    })
}
main()