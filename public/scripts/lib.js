
export const  $ = {
    toFetch: (url) => fetch(url).then((raw)=>raw.json()),
    toFetchCountry : (countryName) => $.toFetch(`https://restcountries.com/v3.1/translation/${countryName}`),
    id:(id)=>document.getElementById(id),
    query:(parent,query) => parent.querySelector(query),
    queryAll:(parent,query) => parent.querySelectorAll(query),
    setContent:(element,txt) =>$.query(element,'.content').textContent = txt,
    frag:()=> document.createDocumentFragment(),
    setImage:(imgEl,src,alt) =>{
        imgEl.src = src
        imgEl.alt = alt
        return imgEl
    },
    setLink:(element,href,txt)=>{
        element.href = href
        element.textContent = txt
        return element
    },
    ev : (el,type,fn) => el.addEventListener(type,fn)
}


