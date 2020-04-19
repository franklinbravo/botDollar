const puppeteer = require('puppeteer');


const bolivarcucuta = () => {
    return new Promise(async(res,rej)=>{
        try{
            const browser = await puppeteer.launch();
    
            const page = await browser.newPage();
    
            await page.goto("http://bolivarcucuta.com/");
            await page.waitForSelector('#dolar')
            let result = await page.evaluate(()=>{
                return document.querySelector('#dolar')
                    .innerText
            })
            res(parseInt(result.toLowerCase().replace('bsf','').trim()));
            await browser.close();
        }catch(err){
            rej(err);
        }
    })

}
let count=0
const getRate=(page)=>{
    return new Promise(async(res,rej)=>{
        try{
            await page.waitForSelector("span.rate--general")
            const tasas= await page.evaluate(async()=>{
                return document.querySelector("span.rate--general").innerText
                
            }) 
            res(tasas)
        }catch(err){
            rej(err)
        }
        
    })
}
const openBrowser=async()=>{
    return new Promise(async(res,rej)=>{
        try{
            const browser = await puppeteer.launch({headless: false,timeout:220000});
    
            const page = await browser.newPage(); 
        
            await page.goto("https://rates.airtm.com/");
            res(page)
        }catch(err){
            rej('Error al al entrar a la pagina')
        }
    

    })
}

const airtm= ()=>{
    openBrowser().then(async(page)=>{
        try{
            let a=await getRate(page)
            console.log(a);
            /* await page.waitForSelector(".text-6xl.pb-4.text-airtm.font-semibold")
            const result= await page.evaluate(()=>{
                return document.querySelector(".text-6xl.pb-4.text-airtm.font-semibold")
            }) */
            //res(result)
            await browser.close();
        }catch(err){
            count++
            setTimeout(async()=>{
                let a=await getRate(page)
                console.log(a);
            },3000)
            console.log(count);
            //rej(err);
        }
    }).catch(err=>console.log(err))
    //return new Promise(async(res,rej)=>{
        
    //})
}


airtm()
    /* .then(rate=>console.log(rate.toString()))
    .catch(err=>console.log(err)) */
/* bolivarcucuta()
    .then(data=>console.log(data)) */