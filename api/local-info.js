function send(res,status,data){res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','public, s-maxage=600, stale-while-revalidate=1200');res.end(JSON.stringify(data))}
function validCoord(n,min,max){const x=Number(n);return Number.isFinite(x)&&x>=min&&x<=max?x:null}
export default async function handler(req,res){
  const lat=validCoord(req.query?.lat,-90,90),lon=validCoord(req.query?.lon,-180,180);if(lat===null||lon===null)return send(res,400,{error:'Coordenadas inválidas'});
  const fahrenheit=req.query?.unit==='fahrenheit';
  const wurl=new URL('https://api.open-meteo.com/v1/forecast');wurl.searchParams.set('latitude',String(lat));wurl.searchParams.set('longitude',String(lon));wurl.searchParams.set('current','temperature_2m,apparent_temperature,weather_code,is_day');wurl.searchParams.set('timezone','auto');wurl.searchParams.set('forecast_days','1');if(fahrenheit)wurl.searchParams.set('temperature_unit','fahrenheit');
  const gurl=new URL('https://nominatim.openstreetmap.org/reverse');gurl.searchParams.set('lat',String(lat));gurl.searchParams.set('lon',String(lon));gurl.searchParams.set('format','jsonv2');gurl.searchParams.set('addressdetails','1');gurl.searchParams.set('zoom','10');gurl.searchParams.set('accept-language','es');
  try{
    const [wr,gr]=await Promise.all([fetch(wurl,{headers:{'Accept':'application/json'}}),fetch(gurl,{headers:{'Accept':'application/json','User-Agent':'FG-Radio-Player/1.3.7'}}).catch(()=>null)]);
    if(!wr.ok)throw new Error('Weather upstream');const w=await wr.json();let geo={};if(gr&&gr.ok){try{geo=await gr.json()}catch{}}
    const ad=geo.address||{};const city=ad.city||ad.town||ad.village||ad.municipality||ad.county||'';const region=ad.state||ad.region||'';const country=ad.country||'';
    return send(res,200,{temperature:w.current?.temperature_2m,apparentTemperature:w.current?.apparent_temperature,weatherCode:w.current?.weather_code,isDay:Boolean(w.current?.is_day),timezone:w.timezone||'',city,region,country});
  }catch(e){console.error('local-info',e);return send(res,502,{error:'No se pudo consultar el clima en este momento'})}
}
