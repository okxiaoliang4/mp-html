"use strict";function t(t){for(var i=Object.create(null),e=t.split(","),s=e.length;s--;)i[e[s]]=!0;return i}function i(t,i){for(var e=t.indexOf("&");-1!==e;){var s=t.indexOf(";",e+3),n=void 0;if(-1===s)break;"#"===t[e+1]?(n=parseInt(("x"===t[e+2]?"0":"")+t.substring(e+2,s)),isNaN(n)||(t=t.substr(0,e)+String.fromCharCode(n)+t.substr(s+1))):(n=t.substring(e+1,s),(a.entities[n]||"amp"===n&&i)&&(t=t.substr(0,e)+(a.entities[n]||"&")+t.substr(s+1))),e=t.indexOf("&",e+1)}return t}function e(t){this.options=t.data||{},this.tagStyle=Object.assign({},a.tagStyle,this.options.tagStyle),this.imgList=t.imgList||[],this.plugins=t.plugins||[],this.attrs=Object.create(null),this.stack=[],this.nodes=[],this.pre=(this.options.containerStyle||"").includes("white-space")&&this.options.containerStyle.includes("pre")?2:0}function s(t){this.handler=t}var a={trustTags:t("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),blockTags:t("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),ignoreTags:t("area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr"),voidTags:t("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),entities:{lt:"<",gt:">",quot:'"',apos:"'",ensp:" ",emsp:" ",nbsp:" ",semi:";",ndash:"–",mdash:"—",middot:"·",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…"},tagStyle:{address:"font-style:italic",big:"display:inline;font-size:1.2em",caption:"display:table-caption;text-align:center",center:"text-align:center",cite:"font-style:italic",dd:"margin-left:40px",mark:"background-color:yellow",pre:"font-family:monospace;white-space:pre",s:"text-decoration:line-through",small:"display:inline;font-size:0.8em",strike:"text-decoration:line-through",u:"text-decoration:underline"},svgDict:{animatetransform:"animateTransform",lineargradient:"linearGradient",viewbox:"viewBox",attributename:"attributeName",repeatcount:"repeatCount",repeatdur:"repeatDur"}},n={},r=tt.getSystemInfoSync(),h=r.windowWidth,o=t(" ,\r,\n,\t,\f"),l=0;e.prototype.parse=function(t){for(var i=this.plugins.length;i--;)this.plugins[i].onUpdate&&(t=this.plugins[i].onUpdate(t,a)||t);for(new s(this).parse(t);this.stack.length;)this.popNode();return this.nodes},e.prototype.expose=function(){for(var t=this.stack.length;t--;){var i=this.stack[t];if(i.c||"a"===i.name||"video"===i.name||"audio"===i.name)return;i.c=1}},e.prototype.hook=function(t){for(var i=this.plugins.length;i--;)if(this.plugins[i].onParse&&!1===this.plugins[i].onParse(t,this))return!1;return!0},e.prototype.getUrl=function(t){var i=this.options.domain;return"/"===t[0]?"/"===t[1]?t=(i?i.split("://")[0]:"http")+":"+t:i&&(t=i+t):!i||t.includes("data:")||t.includes("://")||(t=i+"/"+t),t},e.prototype.parseStyle=function(t){var i=t.attrs,e=(this.tagStyle[t.name]||"").split(";").concat((i.style||"").split(";")),s={},a="";i.id&&!this.xml&&(this.options.useAnchor?this.expose():"img"!==t.name&&"a"!==t.name&&"video"!==t.name&&"audio"!==t.name&&(i.id=void 0)),i.width&&(s.width=parseFloat(i.width)+(i.width.includes("%")?"%":"px"),i.width=void 0),i.height&&(s.height=parseFloat(i.height)+(i.height.includes("%")?"%":"px"),i.height=void 0);for(var n=0,r=e.length;n<r;n++){var l=e[n].split(":");if(!(l.length<2)){var c=l.shift().trim().toLowerCase(),d=l.join(":").trim();if("-"===d[0]&&d.lastIndexOf("-")>0||d.includes("safe"))a+=";".concat(c,":").concat(d);else if(!s[c]||d.includes("import")||!s[c].includes("import")){if(d.includes("url")){var p=d.indexOf("(")+1;if(p){for(;'"'===d[p]||"'"===d[p]||o[d[p]];)p++;d=d.substr(0,p)+this.getUrl(d.substr(p))}}else d.includes("rpx")&&(d=d.replace(/[0-9.]+\s*rpx/g,function(t){return parseFloat(t)*h/750+"px"}));s[c]=d}}}return t.attrs.style=a,s},e.prototype.onTagName=function(t){this.tagName=this.xml?t:t.toLowerCase(),"svg"===this.tagName&&(this.xml=(this.xml||0)+1)},e.prototype.onAttrName=function(t){t=this.xml?t:t.toLowerCase(),"data-"===t.substr(0,5)?"data-src"!==t||this.attrs.src?"img"===this.tagName||"a"===this.tagName?this.attrName=t:this.attrName=void 0:this.attrName="src":(this.attrName=t,this.attrs[t]="T")},e.prototype.onAttrVal=function(t){var e=this.attrName||"";"style"===e||"href"===e?this.attrs[e]=i(t,!0):e.includes("src")?this.attrs[e]=this.getUrl(i(t,!0)):e&&(this.attrs[e]=t)},e.prototype.onOpenTag=function(t){var i=Object.create(null);i.name=this.tagName,i.attrs=this.attrs,this.attrs=Object.create(null);var e=i.attrs,s=this.stack[this.stack.length-1],r=s?s.children:this.nodes,o=this.xml?t:a.voidTags[i.name];if(n[i.name]&&(e.class=n[i.name]+(e.class?" "+e.class:"")),"embed"===i.name){var c=e.src||"";c.includes(".mp4")||c.includes(".3gp")||c.includes(".m3u8")||(e.type||"").includes("video")?i.name="video":(c.includes(".mp3")||c.includes(".wav")||c.includes(".aac")||c.includes(".m4a")||(e.type||"").includes("audio"))&&(i.name="audio"),e.autostart&&(e.autoplay="T"),e.controls="T"}if("video"!==i.name&&"audio"!==i.name||("video"!==i.name||e.id||(e.id="v"+l++),e.controls||e.autoplay||(e.controls="T"),i.src=[],e.src&&(i.src.push(e.src),e.src=void 0),this.expose()),o){if(!this.hook(i)||a.ignoreTags[i.name])return void("base"!==i.name||this.options.domain?"source"===i.name&&s&&("video"===s.name||"audio"===s.name)&&e.src&&s.src.push(e.src):this.options.domain=e.href);var d=this.parseStyle(i);if("img"===i.name){if(e.src&&(e.src.includes("webp")&&(i.webp="T"),e.src.includes("data:")&&!e["original-src"]&&(e.ignore="T"),!e.ignore||i.webp||e.src.includes("cloud://"))){for(var p=this.stack.length;p--;){var u=this.stack[p];if("a"===u.name){i.a=u.attrs;break}var g=u.attrs.style||"";if(!g.includes("flex:")||g.includes("flex:0")||g.includes("flex: 0")||d.width&&d.width.includes("%"))if(g.includes("flex")&&"100%"===d.width)for(var f=p+1;f<this.stack.length;f++){var m=this.stack[f].attrs.style||"";if(!m.includes(";width")&&!m.includes(" width")&&0!==m.indexOf("width")){d.width="";break}}else g.includes("inline-block")&&(d.width&&"%"===d.width[d.width.length-1]?(u.attrs.style+=";max-width:"+d.width,d.width=""):u.attrs.style+=";max-width:100%");else{d.width="100% !important",d.height="";for(var v=p+1;v<this.stack.length;v++)this.stack[v].attrs.style=(this.stack[v].attrs.style||"").replace("inline-","")}u.c=1}i.i=this.imgList.length;var y=e["original-src"]||e.src;if(this.imgList.includes(y)){var x=y.indexOf("://");if(-1!==x){x+=3;for(var b=y.substr(0,x);x<y.length&&"/"!==y[x];x++)b+=Math.random()>.5?y[x].toUpperCase():y[x];b+=y.substr(x),y=b}}this.imgList.push(y)}"inline"===d.display&&(d.display=""),e.ignore&&(d["max-width"]=d["max-width"]||"100%",e.style+=";-webkit-touch-callout:none"),parseInt(d.width)>h&&(d.height=void 0),d.width&&(d.width.includes("auto")?d.width="":(i.w="T",!isNaN(parseInt(d.height))&&(!d.height.includes("%")||s&&(s.attrs.style||"").includes("height"))&&(i.h="T")))}else if("svg"===i.name)return r.push(i),this.stack.push(i),void this.popNode();for(var w in d)d[w]&&(e.style+=";".concat(w,":").concat(d[w].replace(" !important","")));e.style=e.style.substr(1)||void 0}else("pre"===i.name||(e.style||"").includes("white-space")&&e.style.includes("pre"))&&2!==this.pre&&(this.pre=i.pre=1),i.children=[],this.stack.push(i);r.push(i)},e.prototype.onCloseTag=function(t){t=this.xml?t:t.toLowerCase();var i;for(i=this.stack.length;i--&&this.stack[i].name!==t;);if(-1!==i)for(;this.stack.length>i;)this.popNode();else if("p"===t||"br"===t){var e=this.stack.length?this.stack[this.stack.length-1].children:this.nodes;e.push({name:t,attrs:{class:n[t],style:this.tagStyle[t]}})}},e.prototype.popNode=function(){var t=this.stack.pop(),i=t.attrs,e=t.children,s=this.stack[this.stack.length-1],n=s?s.children:this.nodes;if(!this.hook(t)||a.ignoreTags[t.name])return"title"===t.name&&e.length&&"text"===e[0].type&&this.options.setTitle&&tt.setNavigationBarTitle({title:e[0].text}),void n.pop();if(t.pre&&2!==this.pre){this.pre=t.pre=void 0;for(var r=this.stack.length;r--;)this.stack[r].pre&&(this.pre=1)}if("svg"===t.name){if(this.xml>1)return void this.xml--;var o="",l=i.style;return i.style="",i.xmlns="http://www.w3.org/2000/svg",function t(i){if("text"===i.type)return void(o+=i.text);var e=a.svgDict[i.name]||i.name;o+="<"+e;for(var s in i.attrs){var n=i.attrs[s];n&&(o+=" ".concat(a.svgDict[s]||s,'="').concat(n,'"'))}if(i.children){o+=">";for(var r=0;r<i.children.length;r++)t(i.children[r]);o+="</"+e+">"}else o+="/>"}(t),t.name="img",t.attrs={src:"data:image/svg+xml;utf8,"+o.replace(/#/g,"%23"),style:l,ignore:"T"},t.children=void 0,void(this.xml=!1)}var c={};if(i.align&&("table"===t.name?"center"===i.align?c["margin-inline-start"]=c["margin-inline-end"]="auto":c.float=i.align:c["text-align"]=i.align,i.align=void 0),i.dir&&(c.direction=i.dir,i.dir=void 0),"font"===t.name&&(i.color&&(c.color=i.color,i.color=void 0),i.face&&(c["font-family"]=i.face,i.face=void 0),i.size)){var d=parseInt(i.size);isNaN(d)||(d<1?d=1:d>7&&(d=7),c["font-size"]=["x-small","small","medium","large","x-large","xx-large","xxx-large"][d-1]),i.size=void 0}if((i.class||"").includes("align-center")&&(c["text-align"]="center"),Object.assign(c,this.parseStyle(t)),"table"!==t.name&&parseInt(c.width)>h&&(c["max-width"]="100%",c["box-sizing"]="border-box"),a.blockTags[t.name])t.name="div";else if(a.trustTags[t.name]||this.xml)if("a"===t.name||"ad"===t.name)this.expose();else if("video"===t.name||"audio"===t.name)t.children=void 0;else if("ul"!==t.name&&"ol"!==t.name||!t.c){if("table"===t.name){var p=parseFloat(i.cellpadding),u=parseFloat(i.cellspacing),g=parseFloat(i.border);if(t.c&&(isNaN(p)&&(p=2),isNaN(u)&&(u=2)),g&&(i.style+=";border:"+g+"px solid gray"),t.flag&&t.c){t.flag=void 0,c.display="grid",u?(c["grid-gap"]=u+"px",c.padding=u+"px"):g&&(i.style+=";border-left:0;border-top:0");var f=[],m=[],v=[],y={};!function t(i){for(var e=0;e<i.length;e++)"tr"===i[e].name?m.push(i[e]):t(i[e].children||[])}(e);for(var x=1;x<=m.length;x++){for(var b=1,w=0;w<m[x-1].children.length;w++,b++){var k=m[x-1].children[w];if("td"===k.name||"th"===k.name){for(;y[x+"."+b];)b++;k.c=1;var N=k.attrs.style||"",T=N.indexOf("width")?N.indexOf(";width"):0;if(-1!==T){var O=N.indexOf(";",T+6);-1===O&&(O=N.length),k.attrs.colspan||(f[b]=N.substring(T?T+7:6,O)),N=N.substr(0,T)+N.substr(O)}if(N+=(g?";border:".concat(g,"px solid gray")+(u?"":";border-right:0;border-bottom:0"):"")+(p?";padding:".concat(p,"px"):""),k.attrs.colspan&&(N+=";grid-column-start:".concat(b,";grid-column-end:").concat(b+parseInt(k.attrs.colspan)),k.attrs.rowspan||(N+=";grid-row-start:".concat(x,";grid-row-end:").concat(x+1)),b+=parseInt(k.attrs.colspan)-1),k.attrs.rowspan){N+=";grid-row-start:".concat(x,";grid-row-end:").concat(x+parseInt(k.attrs.rowspan)),k.attrs.colspan||(N+=";grid-column-start:".concat(b,";grid-column-end:").concat(b+1));for(var C=1;C<k.attrs.rowspan;C++)for(var S=0;S<(k.attrs.colspan||1);S++)y[x+C+"."+(b-S)]=1}N&&(k.attrs.style=N),v.push(k)}}if(1===x){for(var A="",I=1;I<b;I++)A+=(f[I]?f[I]:"auto")+" ";c["grid-template-columns"]=A}}t.children=v}else t.c&&(c.display="table"),isNaN(u)||(c["border-spacing"]=u+"px"),(g||p||t.c)&&function i(e){for(var s=0;s<e.length;s++){var a=e[s];t.c&&(a.c=1),"th"===a.name||"td"===a.name?(g&&(a.attrs.style="border:".concat(g,"px solid gray;").concat(a.attrs.style||"")),p&&(a.attrs.style="padding:".concat(p,"px;").concat(a.attrs.style||""))):a.children&&i(a.children)}}(e);if(this.options.scrollTable&&!(i.style||"").includes("inline")){var z=Object.assign({},t);t.name="div",t.attrs={style:"overflow-x:auto;padding:1px"},t.children=[z],i=z.attrs}}else if("td"!==t.name&&"th"!==t.name||!i.colspan&&!i.rowspan){if("ruby"===t.name){t.name="span";for(var j=0;j<e.length-1;j++)"text"===e[j].type&&"rt"===e[j+1].name&&(e[j]={name:"span",attrs:{style:"display:inline-block;text-align:center"},children:[{name:"div",attrs:{style:"font-size:50%;"+(e[j+1].attrs.style||"")},children:e[j+1].children},e[j]]},e.splice(j+1,1))}}else for(var L=this.stack.length;L--;)if("table"===this.stack[L].name){this.stack[L].flag=1;break}}else{var q={a:"lower-alpha",A:"upper-alpha",i:"lower-roman",I:"upper-roman"};q[i.type]&&(i.style+=";list-style-type:"+q[i.type],i.type=void 0),t.c=1;for(var F=e.length;F--;)"li"===e[F].name&&(e[F].c=1)}else t.name="span";if((c.display||"").includes("flex")&&!t.c)for(var U=e.length;U--;){var V=e[U];V.f&&(V.attrs.style=(V.attrs.style||"")+V.f,V.f=void 0)}var D=s&&(s.attrs.style||"").includes("flex")&&!t.c;if(D&&(t.f=";max-width:100%"),e.length>=50&&t.c&&!(c.display||"").includes("flex"))for(var B=e.length-1,P=B;P>=-1;P--)(-1===P||e[P].c||!e[P].name||"div"!==e[P].name&&"p"!==e[P].name&&"h"!==e[P].name[0]||(e[P].attrs.style||"").includes("inline"))&&(B-P>=5&&e.splice(P+1,B-P,{name:"div",attrs:{},children:t.children.slice(P+1,B+1)}),B=P-1);for(var Z in c)if(c[Z]){var G=";".concat(Z,":").concat(c[Z].replace(" !important",""));D&&(Z.includes("flex")&&"flex-direction"!==Z||"align-self"===Z||"-"===c[Z][0]||"width"===Z&&G.includes("%"))?(t.f+=G,"width"===Z&&(i.style+=";width:100%")):i.style+=G}i.style=i.style.substr(1)||void 0},e.prototype.onText=function(t){if(!this.pre){for(var e,s="",a=0,n=t.length;a<n;a++)o[t[a]]?(" "!==s[s.length-1]&&(s+=" "),"\n"!==t[a]||e||(e=!0)):s+=t[a];if(" "===s&&e)return;t=s}var r=Object.create(null);if(r.type="text",r.text=i(t),this.hook(r)){(this.stack.length?this.stack[this.stack.length-1].children:this.nodes).push(r)}},s.prototype.parse=function(t){this.content=t||"",this.i=0,this.start=0,this.state=this.text;for(var i=this.content.length;-1!==this.i&&this.i<i;)this.state()},s.prototype.checkClose=function(t){var i="/"===this.content[this.i];return!!(">"===this.content[this.i]||i&&">"===this.content[this.i+1])&&(t&&this.handler[t](this.content.substring(this.start,this.i)),this.i+=i?2:1,this.start=this.i,this.handler.onOpenTag(i),"script"===this.handler.tagName?(this.i=this.content.indexOf("</",this.i),-1!==this.i&&(this.i+=2,this.start=this.i),this.state=this.endTag):this.state=this.text,!0)},s.prototype.text=function(){if(this.i=this.content.indexOf("<",this.i),-1===this.i)return void(this.start<this.content.length&&this.handler.onText(this.content.substring(this.start,this.content.length)));var t=this.content[this.i+1];if(t>="a"&&t<="z"||t>="A"&&t<="Z")this.start!==this.i&&this.handler.onText(this.content.substring(this.start,this.i)),this.start=++this.i,this.state=this.tagName;else if("/"===t||"!"===t||"?"===t){this.start!==this.i&&this.handler.onText(this.content.substring(this.start,this.i));var i=this.content[this.i+2];if("/"===t&&(i>="a"&&i<="z"||i>="A"&&i<="Z"))return this.i+=2,this.start=this.i,void(this.state=this.endTag);var e="--\x3e";"!"===t&&"-"===this.content[this.i+2]&&"-"===this.content[this.i+3]||(e=">"),this.i=this.content.indexOf(e,this.i),-1!==this.i&&(this.i+=e.length,this.start=this.i)}else this.i++},s.prototype.tagName=function(){if(o[this.content[this.i]]){for(this.handler.onTagName(this.content.substring(this.start,this.i));o[this.content[++this.i]];);this.i<this.content.length&&!this.checkClose()&&(this.start=this.i,this.state=this.attrName)}else this.checkClose("onTagName")||this.i++},s.prototype.attrName=function(){var t=this.content[this.i];if(o[t]||"="===t){this.handler.onAttrName(this.content.substring(this.start,this.i));for(var i="="===t,e=this.content.length;++this.i<e;)if(t=this.content[this.i],!o[t]){if(this.checkClose())return;if(i)return this.start=this.i,void(this.state=this.attrVal);if("="!==this.content[this.i])return this.start=this.i,void(this.state=this.attrName);i=!0}}else this.checkClose("onAttrName")||this.i++},s.prototype.attrVal=function(){var t=this.content[this.i],i=this.content.length;if('"'===t||"'"===t){if(this.start=++this.i,this.i=this.content.indexOf(t,this.i),-1===this.i)return;this.handler.onAttrVal(this.content.substring(this.start,this.i))}else for(;this.i<i;this.i++){if(o[this.content[this.i]]){this.handler.onAttrVal(this.content.substring(this.start,this.i));break}if(this.checkClose("onAttrVal"))return}for(;o[this.content[++this.i]];);this.i<i&&!this.checkClose()&&(this.start=this.i,this.state=this.attrName)},s.prototype.endTag=function(){var t=this.content[this.i];if(o[t]||">"===t||"/"===t){if(this.handler.onCloseTag(this.content.substring(this.start,this.i)),">"!==t&&(this.i=this.content.indexOf(">",this.i),-1===this.i))return;this.start=++this.i,this.state=this.text}else this.i++},module.exports=e;