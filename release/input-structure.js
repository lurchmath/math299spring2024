var BasicInputModifier,InputExpression,InputModifier,InputStructure,OutputStructure,Structure,extend=function(t,r){function e(){this.constructor=t}for(var u in r)hasProp.call(r,u)&&(t[u]=r[u]);return e.prototype=r.prototype,t.prototype=new e,t.__super__=r.prototype,t},hasProp={}.hasOwnProperty;"undefined"!=typeof require&&null!==require?(Structure=require("./structure").Structure,OutputStructure=require("./output-structure").OutputStructure):"undefined"!=typeof WorkerGlobalScope&&null!==WorkerGlobalScope?null==WorkerGlobalScope.Structure&&(importScripts("structure.js"),importScripts("output-structure.js")):null!=("undefined"!=typeof self&&null!==self?self.importScripts:void 0)&&null==self.Structure&&(importScripts("release/structure.js"),importScripts("release/output-structure.js")),InputStructure=function(t){function r(){return r.__super__.constructor.apply(this,arguments)}return extend(r,Structure),r.prototype.className=Structure.addSubclass("InputStructure",r),r.prototype.markDirty=function(t){var r;if(null==t&&(t=!0),this.dirty=t,t)return null!=(r=this.parentNode)?r.markDirty():void 0},r.prototype.instancesBeingInterpreted=[],r.prototype.interpret=function(t,r,e){var u,n,i,o,s,p,c,a;for(a=new OutputStructure,n=0,i=0,s=r.length;i<s;i++)for(o=0,p=(u=r[i]).length;o<p;o++)c=u[o],a.insertChild(c,n++);return[a]},r.prototype.recursiveInterpret=function(t,e){var u,n,i,o,s,p,c,a,f,l,d;for(null==t&&(t=[]),null==e&&(e=[]),f=t.length,u=[],s=o=0,c=(l=i=this.children()).length;o<c;s=++o)n=l[s].recursiveInterpret(t,i.slice(s+1)),u.push(n),t=t.concat(n);for(t=t.slice(0,f),r.prototype.instancesBeingInterpreted.push(this),d=this.interpret(t,u,e),r.prototype.instancesBeingInterpreted.pop(),p=0,a=d.length;p<a;p++)d[p].trackIDs();return this.markDirty(!1),d},r.prototype.feedback=function(t){return t.subject=this.id(),Structure.feedback(t)},r}(),InputExpression=function(t){function r(){return r.__super__.constructor.apply(this,arguments)}return extend(r,InputStructure),r.prototype.className=Structure.addSubclass("InputExpression",r),r.prototype.updateData=function(){var t,r,e,u,n,i,o,s,p;for(this.clearAttributesFromModifiers(),p=[],t=0,u=(i=this.getConnectionsIn()).length;t<u;t++)r=i[t],(s=this.getConnectionSource(r))instanceof InputModifier&&p.push(s);for(p.sort(function(t,r){return t===r?0:t.isEarlierThan(r)?-1:1}),o=[],e=0,n=p.length;e<n;e++)s=p[e],o.push(s.updateDataIn(this));return o},r.prototype.setCameFromModifier=function(t){return this.setAttribute("_from modifier "+t,!0)},r.prototype.getCameFromModifier=function(t){return this.getAttribute("_from modifier "+t)},r.prototype.clearAttributesFromModifiers=function(){var t,r,e;r=this.attributes,e=[];for(t in r)hasProp.call(r,t)&&("_from modifier "===t.slice(0,15)?(delete this.attributes[t],e.push(delete this.attributes[t.slice(15)])):e.push(void 0));return e},r.prototype.setSingleValue=function(t,r){return!this.attributes.hasOwnProperty(t)&&(this.setAttribute(t,r),this.setCameFromModifier(t),!0)},r.prototype.addListItem=function(t,r){var e;return(e=this.getAttribute(t))instanceof Array||(e=[]),this.setAttribute(t,e.concat([r])),this.setCameFromModifier(t)},r.prototype.addSetElement=function(t,r){var e,u,n,i,o;for(e=JSON.stringify(r),o=this.getAttribute(t),this.setCameFromModifier(t),o instanceof Array||(o=[]),u=0,n=o.length;u<n;u++)if(i=o[u],e===JSON.stringify(i))return;return this.setAttribute(t,o.concat([r]))},r}(),InputModifier=function(t){function r(){r.__super__.constructor.call(this)}return extend(r,InputStructure),r.prototype.className=Structure.addSubclass("InputModifier",r),r.prototype.insertChild=function(){},r.prototype.updateConnections=function(){},r.prototype.updateDataIn=function(t){},r}(),BasicInputModifier=function(t){function r(){var t;r.__super__.constructor.call(this),this.actions=function(){var r,e,u,n;for(n=[],r=0,e=arguments.length;r<e;r++)3!==(t=arguments[r]).length||"setSingleValue"!==(u=t[2])&&"addListItem"!==u&&"addSetElement"!==u||n.push(t);return n}.apply(this,arguments)}return extend(r,InputModifier),r.prototype.updateDataIn=function(t){var r,e,u,n,i,o,s,p;for(o=[],r=0,u=(n=this.actions).length;r<u;r++)e=(i=n[r])[0],p=i[1],s=i[2],o.push(t[s](e,p));return o},r.prototype.className=Structure.addSubclass("BasicInputModifier",r),r}(),"undefined"!=typeof exports&&null!==exports&&(exports.InputStructure=InputStructure,exports.InputExpression=InputExpression,exports.InputModifier=InputModifier,exports.BasicInputModifier=BasicInputModifier);
//# sourceMappingURL=input-structure.js.map
