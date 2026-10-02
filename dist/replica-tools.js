(()=>{
 const context=document.modelContext;
 if(!context?.registerTool)return;
 const lifecycle=new AbortController();
 Promise.resolve(context.registerTool({
  name:'read_furniture_configuration',title:'현재 가구 구성 읽기',
  description:'Read the dimensions, module counts and estimated price currently shown in the configurator.',
  inputSchema:{type:'object',properties:{},additionalProperties:false},
  annotations:{readOnlyHint:true,untrustedContentHint:false},
  execute(input){
   if(!input||typeof input!=='object'||Object.keys(input).length)throw new Error('Expected an empty object');
   const section=document.querySelector('#section-summary');
   const summary=section?.innerText||document.querySelector('aside[aria-label="요약"]')?.innerText;
   if(!summary)throw new Error('Configuration is not ready');
   return {summary};
  }
 },{signal:lifecycle.signal})).catch(()=>{});
 window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
})();
