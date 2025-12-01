"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../node_modules/media-typer/index.js
var require_media_typer = __commonJS({
  "../node_modules/media-typer/index.js"(exports2) {
    var paramRegExp = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g;
    var textRegExp = /^[\u0020-\u007e\u0080-\u00ff]+$/;
    var tokenRegExp = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/;
    var qescRegExp = /\\([\u0000-\u007f])/g;
    var quoteRegExp = /([\\"])/g;
    var subtypeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/;
    var typeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/;
    var typeRegExp = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
    exports2.format = format;
    exports2.parse = parse;
    function format(obj) {
      if (!obj || typeof obj !== "object") {
        throw new TypeError("argument obj is required");
      }
      var parameters = obj.parameters;
      var subtype = obj.subtype;
      var suffix = obj.suffix;
      var type = obj.type;
      if (!type || !typeNameRegExp.test(type)) {
        throw new TypeError("invalid type");
      }
      if (!subtype || !subtypeNameRegExp.test(subtype)) {
        throw new TypeError("invalid subtype");
      }
      var string = type + "/" + subtype;
      if (suffix) {
        if (!typeNameRegExp.test(suffix)) {
          throw new TypeError("invalid suffix");
        }
        string += "+" + suffix;
      }
      if (parameters && typeof parameters === "object") {
        var param;
        var params = Object.keys(parameters).sort();
        for (var i = 0; i < params.length; i++) {
          param = params[i];
          if (!tokenRegExp.test(param)) {
            throw new TypeError("invalid parameter name");
          }
          string += "; " + param + "=" + qstring(parameters[param]);
        }
      }
      return string;
    }
    function parse(string) {
      if (!string) {
        throw new TypeError("argument string is required");
      }
      if (typeof string === "object") {
        string = getcontenttype(string);
      }
      if (typeof string !== "string") {
        throw new TypeError("argument string is required to be a string");
      }
      var index = string.indexOf(";");
      var type = index !== -1 ? string.substr(0, index) : string;
      var key;
      var match;
      var obj = splitType(type);
      var params = {};
      var value;
      paramRegExp.lastIndex = index;
      while (match = paramRegExp.exec(string)) {
        if (match.index !== index) {
          throw new TypeError("invalid parameter format");
        }
        index += match[0].length;
        key = match[1].toLowerCase();
        value = match[2];
        if (value[0] === '"') {
          value = value.substr(1, value.length - 2).replace(qescRegExp, "$1");
        }
        params[key] = value;
      }
      if (index !== -1 && index !== string.length) {
        throw new TypeError("invalid parameter format");
      }
      obj.parameters = params;
      return obj;
    }
    function getcontenttype(obj) {
      if (typeof obj.getHeader === "function") {
        return obj.getHeader("content-type");
      }
      if (typeof obj.headers === "object") {
        return obj.headers && obj.headers["content-type"];
      }
    }
    function qstring(val) {
      var str = String(val);
      if (tokenRegExp.test(str)) {
        return str;
      }
      if (str.length > 0 && !textRegExp.test(str)) {
        throw new TypeError("invalid parameter value");
      }
      return '"' + str.replace(quoteRegExp, "\\$1") + '"';
    }
    function splitType(string) {
      var match = typeRegExp.exec(string.toLowerCase());
      if (!match) {
        throw new TypeError("invalid media type");
      }
      var type = match[1];
      var subtype = match[2];
      var suffix;
      var index = subtype.lastIndexOf("+");
      if (index !== -1) {
        suffix = subtype.substr(index + 1);
        subtype = subtype.substr(0, index);
      }
      var obj = {
        type,
        subtype,
        suffix
      };
      return obj;
    }
  }
});

// ../node_modules/mime-db/db.json
var require_db = __commonJS({
  "../node_modules/mime-db/db.json"(exports2, module2) {
    module2.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// ../node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "../node_modules/mime-db/index.js"(exports2, module2) {
    module2.exports = require_db();
  }
});

// ../node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "../node_modules/mime-types/index.js"(exports2) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports2.charset = charset;
    exports2.charsets = { lookup: charset };
    exports2.contentType = contentType;
    exports2.extension = extension;
    exports2.extensions = /* @__PURE__ */ Object.create(null);
    exports2.lookup = lookup;
    exports2.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports2.extensions, exports2.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports2.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports2.charset(mime);
        if (charset2) mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports2.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path3) {
      if (!path3 || typeof path3 !== "string") {
        return false;
      }
      var extension2 = extname("x." + path3).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports2.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// ../node_modules/type-is/index.js
var require_type_is = __commonJS({
  "../node_modules/type-is/index.js"(exports2, module2) {
    "use strict";
    var typer = require_media_typer();
    var mime = require_mime_types();
    module2.exports = typeofrequest;
    module2.exports.is = typeis;
    module2.exports.hasBody = hasbody;
    module2.exports.normalize = normalize;
    module2.exports.match = mimeMatch;
    function typeis(value, types_) {
      var i;
      var types = types_;
      var val = tryNormalizeType(value);
      if (!val) {
        return false;
      }
      if (types && !Array.isArray(types)) {
        types = new Array(arguments.length - 1);
        for (i = 0; i < types.length; i++) {
          types[i] = arguments[i + 1];
        }
      }
      if (!types || !types.length) {
        return val;
      }
      var type;
      for (i = 0; i < types.length; i++) {
        if (mimeMatch(normalize(type = types[i]), val)) {
          return type[0] === "+" || type.indexOf("*") !== -1 ? val : type;
        }
      }
      return false;
    }
    function hasbody(req) {
      return req.headers["transfer-encoding"] !== void 0 || !isNaN(req.headers["content-length"]);
    }
    function typeofrequest(req, types_) {
      var types = types_;
      if (!hasbody(req)) {
        return null;
      }
      if (arguments.length > 2) {
        types = new Array(arguments.length - 1);
        for (var i = 0; i < types.length; i++) {
          types[i] = arguments[i + 1];
        }
      }
      var value = req.headers["content-type"];
      return typeis(value, types);
    }
    function normalize(type) {
      if (typeof type !== "string") {
        return false;
      }
      switch (type) {
        case "urlencoded":
          return "application/x-www-form-urlencoded";
        case "multipart":
          return "multipart/*";
      }
      if (type[0] === "+") {
        return "*/*" + type;
      }
      return type.indexOf("/") === -1 ? mime.lookup(type) : type;
    }
    function mimeMatch(expected, actual) {
      if (expected === false) {
        return false;
      }
      var actualParts = actual.split("/");
      var expectedParts = expected.split("/");
      if (actualParts.length !== 2 || expectedParts.length !== 2) {
        return false;
      }
      if (expectedParts[0] !== "*" && expectedParts[0] !== actualParts[0]) {
        return false;
      }
      if (expectedParts[1].substr(0, 2) === "*+") {
        return expectedParts[1].length <= actualParts[1].length + 1 && expectedParts[1].substr(1) === actualParts[1].substr(1 - expectedParts[1].length);
      }
      if (expectedParts[1] !== "*" && expectedParts[1] !== actualParts[1]) {
        return false;
      }
      return true;
    }
    function normalizeType(value) {
      var type = typer.parse(value);
      type.parameters = void 0;
      return typer.format(type);
    }
    function tryNormalizeType(value) {
      if (!value) {
        return null;
      }
      try {
        return normalizeType(value);
      } catch (err) {
        return null;
      }
    }
  }
});

// ../node_modules/busboy/lib/utils.js
var require_utils = __commonJS({
  "../node_modules/busboy/lib/utils.js"(exports2, module2) {
    "use strict";
    function parseContentType(str) {
      if (str.length === 0)
        return;
      const params = /* @__PURE__ */ Object.create(null);
      let i = 0;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (code !== 47 || i === 0)
            return;
          break;
        }
      }
      if (i === str.length)
        return;
      const type = str.slice(0, i).toLowerCase();
      const subtypeStart = ++i;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (i === subtypeStart)
            return;
          if (parseContentTypeParams(str, i, params) === void 0)
            return;
          break;
        }
      }
      if (i === subtypeStart)
        return;
      const subtype = str.slice(subtypeStart, i).toLowerCase();
      return { type, subtype, params };
    }
    function parseContentTypeParams(str, i, params) {
      while (i < str.length) {
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          break;
        if (str.charCodeAt(i++) !== 59)
          return;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          return;
        let name;
        const nameStart = i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (TOKEN[code] !== 1) {
            if (code !== 61)
              return;
            break;
          }
        }
        if (i === str.length)
          return;
        name = str.slice(nameStart, i);
        ++i;
        if (i === str.length)
          return;
        let value = "";
        let valueStart;
        if (str.charCodeAt(i) === 34) {
          valueStart = ++i;
          let escaping = false;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (code === 92) {
              if (escaping) {
                valueStart = i;
                escaping = false;
              } else {
                value += str.slice(valueStart, i);
                escaping = true;
              }
              continue;
            }
            if (code === 34) {
              if (escaping) {
                valueStart = i;
                escaping = false;
                continue;
              }
              value += str.slice(valueStart, i);
              break;
            }
            if (escaping) {
              valueStart = i - 1;
              escaping = false;
            }
            if (QDTEXT[code] !== 1)
              return;
          }
          if (i === str.length)
            return;
          ++i;
        } else {
          valueStart = i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (TOKEN[code] !== 1) {
              if (i === valueStart)
                return;
              break;
            }
          }
          value = str.slice(valueStart, i);
        }
        name = name.toLowerCase();
        if (params[name] === void 0)
          params[name] = value;
      }
      return params;
    }
    function parseDisposition(str, defDecoder) {
      if (str.length === 0)
        return;
      const params = /* @__PURE__ */ Object.create(null);
      let i = 0;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (parseDispositionParams(str, i, params, defDecoder) === void 0)
            return;
          break;
        }
      }
      const type = str.slice(0, i).toLowerCase();
      return { type, params };
    }
    function parseDispositionParams(str, i, params, defDecoder) {
      while (i < str.length) {
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          break;
        if (str.charCodeAt(i++) !== 59)
          return;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          return;
        let name;
        const nameStart = i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (TOKEN[code] !== 1) {
            if (code === 61)
              break;
            return;
          }
        }
        if (i === str.length)
          return;
        let value = "";
        let valueStart;
        let charset;
        name = str.slice(nameStart, i);
        if (name.charCodeAt(name.length - 1) === 42) {
          const charsetStart = ++i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (CHARSET[code] !== 1) {
              if (code !== 39)
                return;
              break;
            }
          }
          if (i === str.length)
            return;
          charset = str.slice(charsetStart, i);
          ++i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (code === 39)
              break;
          }
          if (i === str.length)
            return;
          ++i;
          if (i === str.length)
            return;
          valueStart = i;
          let encode = 0;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (EXTENDED_VALUE[code] !== 1) {
              if (code === 37) {
                let hexUpper;
                let hexLower;
                if (i + 2 < str.length && (hexUpper = HEX_VALUES[str.charCodeAt(i + 1)]) !== -1 && (hexLower = HEX_VALUES[str.charCodeAt(i + 2)]) !== -1) {
                  const byteVal = (hexUpper << 4) + hexLower;
                  value += str.slice(valueStart, i);
                  value += String.fromCharCode(byteVal);
                  i += 2;
                  valueStart = i + 1;
                  if (byteVal >= 128)
                    encode = 2;
                  else if (encode === 0)
                    encode = 1;
                  continue;
                }
                return;
              }
              break;
            }
          }
          value += str.slice(valueStart, i);
          value = convertToUTF8(value, charset, encode);
          if (value === void 0)
            return;
        } else {
          ++i;
          if (i === str.length)
            return;
          if (str.charCodeAt(i) === 34) {
            valueStart = ++i;
            let escaping = false;
            for (; i < str.length; ++i) {
              const code = str.charCodeAt(i);
              if (code === 92) {
                if (escaping) {
                  valueStart = i;
                  escaping = false;
                } else {
                  value += str.slice(valueStart, i);
                  escaping = true;
                }
                continue;
              }
              if (code === 34) {
                if (escaping) {
                  valueStart = i;
                  escaping = false;
                  continue;
                }
                value += str.slice(valueStart, i);
                break;
              }
              if (escaping) {
                valueStart = i - 1;
                escaping = false;
              }
              if (QDTEXT[code] !== 1)
                return;
            }
            if (i === str.length)
              return;
            ++i;
          } else {
            valueStart = i;
            for (; i < str.length; ++i) {
              const code = str.charCodeAt(i);
              if (TOKEN[code] !== 1) {
                if (i === valueStart)
                  return;
                break;
              }
            }
            value = str.slice(valueStart, i);
          }
          value = defDecoder(value, 2);
          if (value === void 0)
            return;
        }
        name = name.toLowerCase();
        if (params[name] === void 0)
          params[name] = value;
      }
      return params;
    }
    function getDecoder(charset) {
      let lc;
      while (true) {
        switch (charset) {
          case "utf-8":
          case "utf8":
            return decoders.utf8;
          case "latin1":
          case "ascii":
          // TODO: Make these a separate, strict decoder?
          case "us-ascii":
          case "iso-8859-1":
          case "iso8859-1":
          case "iso88591":
          case "iso_8859-1":
          case "windows-1252":
          case "iso_8859-1:1987":
          case "cp1252":
          case "x-cp1252":
            return decoders.latin1;
          case "utf16le":
          case "utf-16le":
          case "ucs2":
          case "ucs-2":
            return decoders.utf16le;
          case "base64":
            return decoders.base64;
          default:
            if (lc === void 0) {
              lc = true;
              charset = charset.toLowerCase();
              continue;
            }
            return decoders.other.bind(charset);
        }
      }
    }
    var decoders = {
      utf8: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string") {
          if (hint < 2)
            return data;
          data = Buffer.from(data, "latin1");
        }
        return data.utf8Slice(0, data.length);
      },
      latin1: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          return data;
        return data.latin1Slice(0, data.length);
      },
      utf16le: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        return data.ucs2Slice(0, data.length);
      },
      base64: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        return data.base64Slice(0, data.length);
      },
      other: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        try {
          const decoder = new TextDecoder(exports2);
          return decoder.decode(data);
        } catch {
        }
      }
    };
    function convertToUTF8(data, charset, hint) {
      const decode = getDecoder(charset);
      if (decode)
        return decode(data, hint);
    }
    function basename(path3) {
      if (typeof path3 !== "string")
        return "";
      for (let i = path3.length - 1; i >= 0; --i) {
        switch (path3.charCodeAt(i)) {
          case 47:
          // '/'
          case 92:
            path3 = path3.slice(i + 1);
            return path3 === ".." || path3 === "." ? "" : path3;
        }
      }
      return path3 === ".." || path3 === "." ? "" : path3;
    }
    var TOKEN = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var QDTEXT = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    var CHARSET = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var EXTENDED_VALUE = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var HEX_VALUES = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    module2.exports = {
      basename,
      convertToUTF8,
      getDecoder,
      parseContentType,
      parseDisposition
    };
  }
});

// ../node_modules/streamsearch/lib/sbmh.js
var require_sbmh = __commonJS({
  "../node_modules/streamsearch/lib/sbmh.js"(exports2, module2) {
    "use strict";
    function memcmp(buf1, pos1, buf2, pos2, num) {
      for (let i = 0; i < num; ++i) {
        if (buf1[pos1 + i] !== buf2[pos2 + i])
          return false;
      }
      return true;
    }
    var SBMH = class {
      constructor(needle, cb) {
        if (typeof cb !== "function")
          throw new Error("Missing match callback");
        if (typeof needle === "string")
          needle = Buffer.from(needle);
        else if (!Buffer.isBuffer(needle))
          throw new Error(`Expected Buffer for needle, got ${typeof needle}`);
        const needleLen = needle.length;
        this.maxMatches = Infinity;
        this.matches = 0;
        this._cb = cb;
        this._lookbehindSize = 0;
        this._needle = needle;
        this._bufPos = 0;
        this._lookbehind = Buffer.allocUnsafe(needleLen);
        this._occ = [
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen
        ];
        if (needleLen > 1) {
          for (let i = 0; i < needleLen - 1; ++i)
            this._occ[needle[i]] = needleLen - 1 - i;
        }
      }
      reset() {
        this.matches = 0;
        this._lookbehindSize = 0;
        this._bufPos = 0;
      }
      push(chunk, pos) {
        let result;
        if (!Buffer.isBuffer(chunk))
          chunk = Buffer.from(chunk, "latin1");
        const chunkLen = chunk.length;
        this._bufPos = pos || 0;
        while (result !== chunkLen && this.matches < this.maxMatches)
          result = feed(this, chunk);
        return result;
      }
      destroy() {
        const lbSize = this._lookbehindSize;
        if (lbSize)
          this._cb(false, this._lookbehind, 0, lbSize, false);
        this.reset();
      }
    };
    function feed(self2, data) {
      const len = data.length;
      const needle = self2._needle;
      const needleLen = needle.length;
      let pos = -self2._lookbehindSize;
      const lastNeedleCharPos = needleLen - 1;
      const lastNeedleChar = needle[lastNeedleCharPos];
      const end = len - needleLen;
      const occ = self2._occ;
      const lookbehind = self2._lookbehind;
      if (pos < 0) {
        while (pos < 0 && pos <= end) {
          const nextPos = pos + lastNeedleCharPos;
          const ch = nextPos < 0 ? lookbehind[self2._lookbehindSize + nextPos] : data[nextPos];
          if (ch === lastNeedleChar && matchNeedle(self2, data, pos, lastNeedleCharPos)) {
            self2._lookbehindSize = 0;
            ++self2.matches;
            if (pos > -self2._lookbehindSize)
              self2._cb(true, lookbehind, 0, self2._lookbehindSize + pos, false);
            else
              self2._cb(true, void 0, 0, 0, true);
            return self2._bufPos = pos + needleLen;
          }
          pos += occ[ch];
        }
        while (pos < 0 && !matchNeedle(self2, data, pos, len - pos))
          ++pos;
        if (pos < 0) {
          const bytesToCutOff = self2._lookbehindSize + pos;
          if (bytesToCutOff > 0) {
            self2._cb(false, lookbehind, 0, bytesToCutOff, false);
          }
          self2._lookbehindSize -= bytesToCutOff;
          lookbehind.copy(lookbehind, 0, bytesToCutOff, self2._lookbehindSize);
          lookbehind.set(data, self2._lookbehindSize);
          self2._lookbehindSize += len;
          self2._bufPos = len;
          return len;
        }
        self2._cb(false, lookbehind, 0, self2._lookbehindSize, false);
        self2._lookbehindSize = 0;
      }
      pos += self2._bufPos;
      const firstNeedleChar = needle[0];
      while (pos <= end) {
        const ch = data[pos + lastNeedleCharPos];
        if (ch === lastNeedleChar && data[pos] === firstNeedleChar && memcmp(needle, 0, data, pos, lastNeedleCharPos)) {
          ++self2.matches;
          if (pos > 0)
            self2._cb(true, data, self2._bufPos, pos, true);
          else
            self2._cb(true, void 0, 0, 0, true);
          return self2._bufPos = pos + needleLen;
        }
        pos += occ[ch];
      }
      while (pos < len) {
        if (data[pos] !== firstNeedleChar || !memcmp(data, pos, needle, 0, len - pos)) {
          ++pos;
          continue;
        }
        data.copy(lookbehind, 0, pos, len);
        self2._lookbehindSize = len - pos;
        break;
      }
      if (pos > 0)
        self2._cb(false, data, self2._bufPos, pos < len ? pos : len, true);
      self2._bufPos = len;
      return len;
    }
    function matchNeedle(self2, data, pos, len) {
      const lb = self2._lookbehind;
      const lbSize = self2._lookbehindSize;
      const needle = self2._needle;
      for (let i = 0; i < len; ++i, ++pos) {
        const ch = pos < 0 ? lb[lbSize + pos] : data[pos];
        if (ch !== needle[i])
          return false;
      }
      return true;
    }
    module2.exports = SBMH;
  }
});

// ../node_modules/busboy/lib/types/multipart.js
var require_multipart = __commonJS({
  "../node_modules/busboy/lib/types/multipart.js"(exports2, module2) {
    "use strict";
    var { Readable, Writable } = require("stream");
    var StreamSearch = require_sbmh();
    var {
      basename,
      convertToUTF8,
      getDecoder,
      parseContentType,
      parseDisposition
    } = require_utils();
    var BUF_CRLF = Buffer.from("\r\n");
    var BUF_CR = Buffer.from("\r");
    var BUF_DASH = Buffer.from("-");
    function noop() {
    }
    var MAX_HEADER_PAIRS = 2e3;
    var MAX_HEADER_SIZE = 16 * 1024;
    var HPARSER_NAME = 0;
    var HPARSER_PRE_OWS = 1;
    var HPARSER_VALUE = 2;
    var HeaderParser = class {
      constructor(cb) {
        this.header = /* @__PURE__ */ Object.create(null);
        this.pairCount = 0;
        this.byteCount = 0;
        this.state = HPARSER_NAME;
        this.name = "";
        this.value = "";
        this.crlf = 0;
        this.cb = cb;
      }
      reset() {
        this.header = /* @__PURE__ */ Object.create(null);
        this.pairCount = 0;
        this.byteCount = 0;
        this.state = HPARSER_NAME;
        this.name = "";
        this.value = "";
        this.crlf = 0;
      }
      push(chunk, pos, end) {
        let start = pos;
        while (pos < end) {
          switch (this.state) {
            case HPARSER_NAME: {
              let done = false;
              for (; pos < end; ++pos) {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                const code = chunk[pos];
                if (TOKEN[code] !== 1) {
                  if (code !== 58)
                    return -1;
                  this.name += chunk.latin1Slice(start, pos);
                  if (this.name.length === 0)
                    return -1;
                  ++pos;
                  done = true;
                  this.state = HPARSER_PRE_OWS;
                  break;
                }
              }
              if (!done) {
                this.name += chunk.latin1Slice(start, pos);
                break;
              }
            }
            case HPARSER_PRE_OWS: {
              let done = false;
              for (; pos < end; ++pos) {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                const code = chunk[pos];
                if (code !== 32 && code !== 9) {
                  start = pos;
                  done = true;
                  this.state = HPARSER_VALUE;
                  break;
                }
              }
              if (!done)
                break;
            }
            case HPARSER_VALUE:
              switch (this.crlf) {
                case 0:
                  for (; pos < end; ++pos) {
                    if (this.byteCount === MAX_HEADER_SIZE)
                      return -1;
                    ++this.byteCount;
                    const code = chunk[pos];
                    if (FIELD_VCHAR[code] !== 1) {
                      if (code !== 13)
                        return -1;
                      ++this.crlf;
                      break;
                    }
                  }
                  this.value += chunk.latin1Slice(start, pos++);
                  break;
                case 1:
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  if (chunk[pos++] !== 10)
                    return -1;
                  ++this.crlf;
                  break;
                case 2: {
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  const code = chunk[pos];
                  if (code === 32 || code === 9) {
                    start = pos;
                    this.crlf = 0;
                  } else {
                    if (++this.pairCount < MAX_HEADER_PAIRS) {
                      this.name = this.name.toLowerCase();
                      if (this.header[this.name] === void 0)
                        this.header[this.name] = [this.value];
                      else
                        this.header[this.name].push(this.value);
                    }
                    if (code === 13) {
                      ++this.crlf;
                      ++pos;
                    } else {
                      start = pos;
                      this.crlf = 0;
                      this.state = HPARSER_NAME;
                      this.name = "";
                      this.value = "";
                    }
                  }
                  break;
                }
                case 3: {
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  if (chunk[pos++] !== 10)
                    return -1;
                  const header = this.header;
                  this.reset();
                  this.cb(header);
                  return pos;
                }
              }
              break;
          }
        }
        return pos;
      }
    };
    var FileStream = class extends Readable {
      constructor(opts, owner) {
        super(opts);
        this.truncated = false;
        this._readcb = null;
        this.once("end", () => {
          this._read();
          if (--owner._fileEndsLeft === 0 && owner._finalcb) {
            const cb = owner._finalcb;
            owner._finalcb = null;
            process.nextTick(cb);
          }
        });
      }
      _read(n) {
        const cb = this._readcb;
        if (cb) {
          this._readcb = null;
          cb();
        }
      }
    };
    var ignoreData = {
      push: (chunk, pos) => {
      },
      destroy: () => {
      }
    };
    function callAndUnsetCb(self2, err) {
      const cb = self2._writecb;
      self2._writecb = null;
      if (err)
        self2.destroy(err);
      else if (cb)
        cb();
    }
    function nullDecoder(val, hint) {
      return val;
    }
    var Multipart = class extends Writable {
      constructor(cfg) {
        const streamOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : void 0
        };
        super(streamOpts);
        if (!cfg.conType.params || typeof cfg.conType.params.boundary !== "string")
          throw new Error("Multipart: Boundary not found");
        const boundary = cfg.conType.params.boundary;
        const paramDecoder = typeof cfg.defParamCharset === "string" && cfg.defParamCharset ? getDecoder(cfg.defParamCharset) : nullDecoder;
        const defCharset = cfg.defCharset || "utf8";
        const preservePath = cfg.preservePath;
        const fileOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.fileHwm === "number" ? cfg.fileHwm : void 0
        };
        const limits = cfg.limits;
        const fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
        const fileSizeLimit = limits && typeof limits.fileSize === "number" ? limits.fileSize : Infinity;
        const filesLimit = limits && typeof limits.files === "number" ? limits.files : Infinity;
        const fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
        const partsLimit = limits && typeof limits.parts === "number" ? limits.parts : Infinity;
        let parts = -1;
        let fields = 0;
        let files = 0;
        let skipPart = false;
        this._fileEndsLeft = 0;
        this._fileStream = void 0;
        this._complete = false;
        let fileSize = 0;
        let field;
        let fieldSize = 0;
        let partCharset;
        let partEncoding;
        let partType;
        let partName;
        let partTruncated = false;
        let hitFilesLimit = false;
        let hitFieldsLimit = false;
        this._hparser = null;
        const hparser = new HeaderParser((header) => {
          this._hparser = null;
          skipPart = false;
          partType = "text/plain";
          partCharset = defCharset;
          partEncoding = "7bit";
          partName = void 0;
          partTruncated = false;
          let filename;
          if (!header["content-disposition"]) {
            skipPart = true;
            return;
          }
          const disp = parseDisposition(
            header["content-disposition"][0],
            paramDecoder
          );
          if (!disp || disp.type !== "form-data") {
            skipPart = true;
            return;
          }
          if (disp.params) {
            if (disp.params.name)
              partName = disp.params.name;
            if (disp.params["filename*"])
              filename = disp.params["filename*"];
            else if (disp.params.filename)
              filename = disp.params.filename;
            if (filename !== void 0 && !preservePath)
              filename = basename(filename);
          }
          if (header["content-type"]) {
            const conType = parseContentType(header["content-type"][0]);
            if (conType) {
              partType = `${conType.type}/${conType.subtype}`;
              if (conType.params && typeof conType.params.charset === "string")
                partCharset = conType.params.charset.toLowerCase();
            }
          }
          if (header["content-transfer-encoding"])
            partEncoding = header["content-transfer-encoding"][0].toLowerCase();
          if (partType === "application/octet-stream" || filename !== void 0) {
            if (files === filesLimit) {
              if (!hitFilesLimit) {
                hitFilesLimit = true;
                this.emit("filesLimit");
              }
              skipPart = true;
              return;
            }
            ++files;
            if (this.listenerCount("file") === 0) {
              skipPart = true;
              return;
            }
            fileSize = 0;
            this._fileStream = new FileStream(fileOpts, this);
            ++this._fileEndsLeft;
            this.emit(
              "file",
              partName,
              this._fileStream,
              {
                filename,
                encoding: partEncoding,
                mimeType: partType
              }
            );
          } else {
            if (fields === fieldsLimit) {
              if (!hitFieldsLimit) {
                hitFieldsLimit = true;
                this.emit("fieldsLimit");
              }
              skipPart = true;
              return;
            }
            ++fields;
            if (this.listenerCount("field") === 0) {
              skipPart = true;
              return;
            }
            field = [];
            fieldSize = 0;
          }
        });
        let matchPostBoundary = 0;
        const ssCb = (isMatch, data, start, end, isDataSafe) => {
          retrydata:
            while (data) {
              if (this._hparser !== null) {
                const ret = this._hparser.push(data, start, end);
                if (ret === -1) {
                  this._hparser = null;
                  hparser.reset();
                  this.emit("error", new Error("Malformed part header"));
                  break;
                }
                start = ret;
              }
              if (start === end)
                break;
              if (matchPostBoundary !== 0) {
                if (matchPostBoundary === 1) {
                  switch (data[start]) {
                    case 45:
                      matchPostBoundary = 2;
                      ++start;
                      break;
                    case 13:
                      matchPostBoundary = 3;
                      ++start;
                      break;
                    default:
                      matchPostBoundary = 0;
                  }
                  if (start === end)
                    return;
                }
                if (matchPostBoundary === 2) {
                  matchPostBoundary = 0;
                  if (data[start] === 45) {
                    this._complete = true;
                    this._bparser = ignoreData;
                    return;
                  }
                  const writecb = this._writecb;
                  this._writecb = noop;
                  ssCb(false, BUF_DASH, 0, 1, false);
                  this._writecb = writecb;
                } else if (matchPostBoundary === 3) {
                  matchPostBoundary = 0;
                  if (data[start] === 10) {
                    ++start;
                    if (parts >= partsLimit)
                      break;
                    this._hparser = hparser;
                    if (start === end)
                      break;
                    continue retrydata;
                  } else {
                    const writecb = this._writecb;
                    this._writecb = noop;
                    ssCb(false, BUF_CR, 0, 1, false);
                    this._writecb = writecb;
                  }
                }
              }
              if (!skipPart) {
                if (this._fileStream) {
                  let chunk;
                  const actualLen = Math.min(end - start, fileSizeLimit - fileSize);
                  if (!isDataSafe) {
                    chunk = Buffer.allocUnsafe(actualLen);
                    data.copy(chunk, 0, start, start + actualLen);
                  } else {
                    chunk = data.slice(start, start + actualLen);
                  }
                  fileSize += chunk.length;
                  if (fileSize === fileSizeLimit) {
                    if (chunk.length > 0)
                      this._fileStream.push(chunk);
                    this._fileStream.emit("limit");
                    this._fileStream.truncated = true;
                    skipPart = true;
                  } else if (!this._fileStream.push(chunk)) {
                    if (this._writecb)
                      this._fileStream._readcb = this._writecb;
                    this._writecb = null;
                  }
                } else if (field !== void 0) {
                  let chunk;
                  const actualLen = Math.min(
                    end - start,
                    fieldSizeLimit - fieldSize
                  );
                  if (!isDataSafe) {
                    chunk = Buffer.allocUnsafe(actualLen);
                    data.copy(chunk, 0, start, start + actualLen);
                  } else {
                    chunk = data.slice(start, start + actualLen);
                  }
                  fieldSize += actualLen;
                  field.push(chunk);
                  if (fieldSize === fieldSizeLimit) {
                    skipPart = true;
                    partTruncated = true;
                  }
                }
              }
              break;
            }
          if (isMatch) {
            matchPostBoundary = 1;
            if (this._fileStream) {
              this._fileStream.push(null);
              this._fileStream = null;
            } else if (field !== void 0) {
              let data2;
              switch (field.length) {
                case 0:
                  data2 = "";
                  break;
                case 1:
                  data2 = convertToUTF8(field[0], partCharset, 0);
                  break;
                default:
                  data2 = convertToUTF8(
                    Buffer.concat(field, fieldSize),
                    partCharset,
                    0
                  );
              }
              field = void 0;
              fieldSize = 0;
              this.emit(
                "field",
                partName,
                data2,
                {
                  nameTruncated: false,
                  valueTruncated: partTruncated,
                  encoding: partEncoding,
                  mimeType: partType
                }
              );
            }
            if (++parts === partsLimit)
              this.emit("partsLimit");
          }
        };
        this._bparser = new StreamSearch(`\r
--${boundary}`, ssCb);
        this._writecb = null;
        this._finalcb = null;
        this.write(BUF_CRLF);
      }
      static detect(conType) {
        return conType.type === "multipart" && conType.subtype === "form-data";
      }
      _write(chunk, enc, cb) {
        this._writecb = cb;
        this._bparser.push(chunk, 0);
        if (this._writecb)
          callAndUnsetCb(this);
      }
      _destroy(err, cb) {
        this._hparser = null;
        this._bparser = ignoreData;
        if (!err)
          err = checkEndState(this);
        const fileStream = this._fileStream;
        if (fileStream) {
          this._fileStream = null;
          fileStream.destroy(err);
        }
        cb(err);
      }
      _final(cb) {
        this._bparser.destroy();
        if (!this._complete)
          return cb(new Error("Unexpected end of form"));
        if (this._fileEndsLeft)
          this._finalcb = finalcb.bind(null, this, cb);
        else
          finalcb(this, cb);
      }
    };
    function finalcb(self2, cb, err) {
      if (err)
        return cb(err);
      err = checkEndState(self2);
      cb(err);
    }
    function checkEndState(self2) {
      if (self2._hparser)
        return new Error("Malformed part header");
      const fileStream = self2._fileStream;
      if (fileStream) {
        self2._fileStream = null;
        fileStream.destroy(new Error("Unexpected end of file"));
      }
      if (!self2._complete)
        return new Error("Unexpected end of form");
    }
    var TOKEN = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var FIELD_VCHAR = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    module2.exports = Multipart;
  }
});

// ../node_modules/busboy/lib/types/urlencoded.js
var require_urlencoded = __commonJS({
  "../node_modules/busboy/lib/types/urlencoded.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("stream");
    var { getDecoder } = require_utils();
    var URLEncoded = class extends Writable {
      constructor(cfg) {
        const streamOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : void 0
        };
        super(streamOpts);
        let charset = cfg.defCharset || "utf8";
        if (cfg.conType.params && typeof cfg.conType.params.charset === "string")
          charset = cfg.conType.params.charset;
        this.charset = charset;
        const limits = cfg.limits;
        this.fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
        this.fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
        this.fieldNameSizeLimit = limits && typeof limits.fieldNameSize === "number" ? limits.fieldNameSize : 100;
        this._inKey = true;
        this._keyTrunc = false;
        this._valTrunc = false;
        this._bytesKey = 0;
        this._bytesVal = 0;
        this._fields = 0;
        this._key = "";
        this._val = "";
        this._byte = -2;
        this._lastPos = 0;
        this._encode = 0;
        this._decoder = getDecoder(charset);
      }
      static detect(conType) {
        return conType.type === "application" && conType.subtype === "x-www-form-urlencoded";
      }
      _write(chunk, enc, cb) {
        if (this._fields >= this.fieldsLimit)
          return cb();
        let i = 0;
        const len = chunk.length;
        this._lastPos = 0;
        if (this._byte !== -2) {
          i = readPctEnc(this, chunk, i, len);
          if (i === -1)
            return cb(new Error("Malformed urlencoded form"));
          if (i >= len)
            return cb();
          if (this._inKey)
            ++this._bytesKey;
          else
            ++this._bytesVal;
        }
        main:
          while (i < len) {
            if (this._inKey) {
              i = skipKeyBytes(this, chunk, i, len);
              while (i < len) {
                switch (chunk[i]) {
                  case 61:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._key = this._decoder(this._key, this._encode);
                    this._encode = 0;
                    this._inKey = false;
                    continue main;
                  case 38:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._key = this._decoder(this._key, this._encode);
                    this._encode = 0;
                    if (this._bytesKey > 0) {
                      this.emit(
                        "field",
                        this._key,
                        "",
                        {
                          nameTruncated: this._keyTrunc,
                          valueTruncated: false,
                          encoding: this.charset,
                          mimeType: "text/plain"
                        }
                      );
                    }
                    this._key = "";
                    this._val = "";
                    this._keyTrunc = false;
                    this._valTrunc = false;
                    this._bytesKey = 0;
                    this._bytesVal = 0;
                    if (++this._fields >= this.fieldsLimit) {
                      this.emit("fieldsLimit");
                      return cb();
                    }
                    continue;
                  case 43:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._key += " ";
                    this._lastPos = i + 1;
                    break;
                  case 37:
                    if (this._encode === 0)
                      this._encode = 1;
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = i + 1;
                    this._byte = -1;
                    i = readPctEnc(this, chunk, i + 1, len);
                    if (i === -1)
                      return cb(new Error("Malformed urlencoded form"));
                    if (i >= len)
                      return cb();
                    ++this._bytesKey;
                    i = skipKeyBytes(this, chunk, i, len);
                    continue;
                }
                ++i;
                ++this._bytesKey;
                i = skipKeyBytes(this, chunk, i, len);
              }
              if (this._lastPos < i)
                this._key += chunk.latin1Slice(this._lastPos, i);
            } else {
              i = skipValBytes(this, chunk, i, len);
              while (i < len) {
                switch (chunk[i]) {
                  case 38:
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._inKey = true;
                    this._val = this._decoder(this._val, this._encode);
                    this._encode = 0;
                    if (this._bytesKey > 0 || this._bytesVal > 0) {
                      this.emit(
                        "field",
                        this._key,
                        this._val,
                        {
                          nameTruncated: this._keyTrunc,
                          valueTruncated: this._valTrunc,
                          encoding: this.charset,
                          mimeType: "text/plain"
                        }
                      );
                    }
                    this._key = "";
                    this._val = "";
                    this._keyTrunc = false;
                    this._valTrunc = false;
                    this._bytesKey = 0;
                    this._bytesVal = 0;
                    if (++this._fields >= this.fieldsLimit) {
                      this.emit("fieldsLimit");
                      return cb();
                    }
                    continue main;
                  case 43:
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._val += " ";
                    this._lastPos = i + 1;
                    break;
                  case 37:
                    if (this._encode === 0)
                      this._encode = 1;
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = i + 1;
                    this._byte = -1;
                    i = readPctEnc(this, chunk, i + 1, len);
                    if (i === -1)
                      return cb(new Error("Malformed urlencoded form"));
                    if (i >= len)
                      return cb();
                    ++this._bytesVal;
                    i = skipValBytes(this, chunk, i, len);
                    continue;
                }
                ++i;
                ++this._bytesVal;
                i = skipValBytes(this, chunk, i, len);
              }
              if (this._lastPos < i)
                this._val += chunk.latin1Slice(this._lastPos, i);
            }
          }
        cb();
      }
      _final(cb) {
        if (this._byte !== -2)
          return cb(new Error("Malformed urlencoded form"));
        if (!this._inKey || this._bytesKey > 0 || this._bytesVal > 0) {
          if (this._inKey)
            this._key = this._decoder(this._key, this._encode);
          else
            this._val = this._decoder(this._val, this._encode);
          this.emit(
            "field",
            this._key,
            this._val,
            {
              nameTruncated: this._keyTrunc,
              valueTruncated: this._valTrunc,
              encoding: this.charset,
              mimeType: "text/plain"
            }
          );
        }
        cb();
      }
    };
    function readPctEnc(self2, chunk, pos, len) {
      if (pos >= len)
        return len;
      if (self2._byte === -1) {
        const hexUpper = HEX_VALUES[chunk[pos++]];
        if (hexUpper === -1)
          return -1;
        if (hexUpper >= 8)
          self2._encode = 2;
        if (pos < len) {
          const hexLower = HEX_VALUES[chunk[pos++]];
          if (hexLower === -1)
            return -1;
          if (self2._inKey)
            self2._key += String.fromCharCode((hexUpper << 4) + hexLower);
          else
            self2._val += String.fromCharCode((hexUpper << 4) + hexLower);
          self2._byte = -2;
          self2._lastPos = pos;
        } else {
          self2._byte = hexUpper;
        }
      } else {
        const hexLower = HEX_VALUES[chunk[pos++]];
        if (hexLower === -1)
          return -1;
        if (self2._inKey)
          self2._key += String.fromCharCode((self2._byte << 4) + hexLower);
        else
          self2._val += String.fromCharCode((self2._byte << 4) + hexLower);
        self2._byte = -2;
        self2._lastPos = pos;
      }
      return pos;
    }
    function skipKeyBytes(self2, chunk, pos, len) {
      if (self2._bytesKey > self2.fieldNameSizeLimit) {
        if (!self2._keyTrunc) {
          if (self2._lastPos < pos)
            self2._key += chunk.latin1Slice(self2._lastPos, pos - 1);
        }
        self2._keyTrunc = true;
        for (; pos < len; ++pos) {
          const code = chunk[pos];
          if (code === 61 || code === 38)
            break;
          ++self2._bytesKey;
        }
        self2._lastPos = pos;
      }
      return pos;
    }
    function skipValBytes(self2, chunk, pos, len) {
      if (self2._bytesVal > self2.fieldSizeLimit) {
        if (!self2._valTrunc) {
          if (self2._lastPos < pos)
            self2._val += chunk.latin1Slice(self2._lastPos, pos - 1);
        }
        self2._valTrunc = true;
        for (; pos < len; ++pos) {
          if (chunk[pos] === 38)
            break;
          ++self2._bytesVal;
        }
        self2._lastPos = pos;
      }
      return pos;
    }
    var HEX_VALUES = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    module2.exports = URLEncoded;
  }
});

// ../node_modules/busboy/lib/index.js
var require_lib = __commonJS({
  "../node_modules/busboy/lib/index.js"(exports2, module2) {
    "use strict";
    var { parseContentType } = require_utils();
    function getInstance(cfg) {
      const headers = cfg.headers;
      const conType = parseContentType(headers["content-type"]);
      if (!conType)
        throw new Error("Malformed content type");
      for (const type of TYPES) {
        const matched = type.detect(conType);
        if (!matched)
          continue;
        const instanceCfg = {
          limits: cfg.limits,
          headers,
          conType,
          highWaterMark: void 0,
          fileHwm: void 0,
          defCharset: void 0,
          defParamCharset: void 0,
          preservePath: false
        };
        if (cfg.highWaterMark)
          instanceCfg.highWaterMark = cfg.highWaterMark;
        if (cfg.fileHwm)
          instanceCfg.fileHwm = cfg.fileHwm;
        instanceCfg.defCharset = cfg.defCharset;
        instanceCfg.defParamCharset = cfg.defParamCharset;
        instanceCfg.preservePath = cfg.preservePath;
        return new type(instanceCfg);
      }
      throw new Error(`Unsupported content type: ${headers["content-type"]}`);
    }
    var TYPES = [
      require_multipart(),
      require_urlencoded()
    ].filter(function(typemod) {
      return typeof typemod.detect === "function";
    });
    module2.exports = (cfg) => {
      if (typeof cfg !== "object" || cfg === null)
        cfg = {};
      if (typeof cfg.headers !== "object" || cfg.headers === null || typeof cfg.headers["content-type"] !== "string") {
        throw new Error("Missing Content-Type");
      }
      return getInstance(cfg);
    };
  }
});

// ../node_modules/xtend/immutable.js
var require_immutable = __commonJS({
  "../node_modules/xtend/immutable.js"(exports2, module2) {
    module2.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend() {
      var target = {};
      for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
  }
});

// ../node_modules/append-field/lib/parse-path.js
var require_parse_path = __commonJS({
  "../node_modules/append-field/lib/parse-path.js"(exports2, module2) {
    var reFirstKey = /^[^\[]*/;
    var reDigitPath = /^\[(\d+)\]/;
    var reNormalPath = /^\[([^\]]+)\]/;
    function parsePath(key) {
      function failure() {
        return [{ type: "object", key, last: true }];
      }
      var firstKey = reFirstKey.exec(key)[0];
      if (!firstKey) return failure();
      var len = key.length;
      var pos = firstKey.length;
      var tail = { type: "object", key: firstKey };
      var steps = [tail];
      while (pos < len) {
        var m;
        if (key[pos] === "[" && key[pos + 1] === "]") {
          pos += 2;
          tail.append = true;
          if (pos !== len) return failure();
          continue;
        }
        m = reDigitPath.exec(key.substring(pos));
        if (m !== null) {
          pos += m[0].length;
          tail.nextType = "array";
          tail = { type: "array", key: parseInt(m[1], 10) };
          steps.push(tail);
          continue;
        }
        m = reNormalPath.exec(key.substring(pos));
        if (m !== null) {
          pos += m[0].length;
          tail.nextType = "object";
          tail = { type: "object", key: m[1] };
          steps.push(tail);
          continue;
        }
        return failure();
      }
      tail.last = true;
      return steps;
    }
    module2.exports = parsePath;
  }
});

// ../node_modules/append-field/lib/set-value.js
var require_set_value = __commonJS({
  "../node_modules/append-field/lib/set-value.js"(exports2, module2) {
    function valueType(value) {
      if (value === void 0) return "undefined";
      if (Array.isArray(value)) return "array";
      if (typeof value === "object") return "object";
      return "scalar";
    }
    function setLastValue(context, step, currentValue, entryValue) {
      switch (valueType(currentValue)) {
        case "undefined":
          if (step.append) {
            context[step.key] = [entryValue];
          } else {
            context[step.key] = entryValue;
          }
          break;
        case "array":
          context[step.key].push(entryValue);
          break;
        case "object":
          return setLastValue(currentValue, { type: "object", key: "", last: true }, currentValue[""], entryValue);
        case "scalar":
          context[step.key] = [context[step.key], entryValue];
          break;
      }
      return context;
    }
    function setValue(context, step, currentValue, entryValue) {
      if (step.last) return setLastValue(context, step, currentValue, entryValue);
      var obj;
      switch (valueType(currentValue)) {
        case "undefined":
          if (step.nextType === "array") {
            context[step.key] = [];
          } else {
            context[step.key] = /* @__PURE__ */ Object.create(null);
          }
          return context[step.key];
        case "object":
          return context[step.key];
        case "array":
          if (step.nextType === "array") {
            return currentValue;
          }
          obj = /* @__PURE__ */ Object.create(null);
          context[step.key] = obj;
          currentValue.forEach(function(item, i) {
            if (item !== void 0) obj["" + i] = item;
          });
          return obj;
        case "scalar":
          obj = /* @__PURE__ */ Object.create(null);
          obj[""] = currentValue;
          context[step.key] = obj;
          return obj;
      }
    }
    module2.exports = setValue;
  }
});

// ../node_modules/append-field/index.js
var require_append_field = __commonJS({
  "../node_modules/append-field/index.js"(exports2, module2) {
    var parsePath = require_parse_path();
    var setValue = require_set_value();
    function appendField(store, key, value) {
      var steps = parsePath(key);
      steps.reduce(function(context, step) {
        return setValue(context, step, context[step.key], value);
      }, store);
    }
    module2.exports = appendField;
  }
});

// ../node_modules/multer/lib/counter.js
var require_counter = __commonJS({
  "../node_modules/multer/lib/counter.js"(exports2, module2) {
    var EventEmitter = require("events").EventEmitter;
    function Counter() {
      EventEmitter.call(this);
      this.value = 0;
    }
    Counter.prototype = Object.create(EventEmitter.prototype);
    Counter.prototype.increment = function increment() {
      this.value++;
    };
    Counter.prototype.decrement = function decrement() {
      if (--this.value === 0) this.emit("zero");
    };
    Counter.prototype.isZero = function isZero() {
      return this.value === 0;
    };
    Counter.prototype.onceZero = function onceZero(fn) {
      if (this.isZero()) return fn();
      this.once("zero", fn);
    };
    module2.exports = Counter;
  }
});

// ../node_modules/multer/lib/multer-error.js
var require_multer_error = __commonJS({
  "../node_modules/multer/lib/multer-error.js"(exports2, module2) {
    var util2 = require("util");
    var errorMessages = {
      LIMIT_PART_COUNT: "Too many parts",
      LIMIT_FILE_SIZE: "File too large",
      LIMIT_FILE_COUNT: "Too many files",
      LIMIT_FIELD_KEY: "Field name too long",
      LIMIT_FIELD_VALUE: "Field value too long",
      LIMIT_FIELD_COUNT: "Too many fields",
      LIMIT_UNEXPECTED_FILE: "Unexpected field",
      MISSING_FIELD_NAME: "Field name missing"
    };
    function MulterError(code, field) {
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.message = errorMessages[code];
      this.code = code;
      if (field) this.field = field;
    }
    util2.inherits(MulterError, Error);
    module2.exports = MulterError;
  }
});

// ../node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "../node_modules/object-assign/index.js"(exports2, module2) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// ../node_modules/multer/lib/file-appender.js
var require_file_appender = __commonJS({
  "../node_modules/multer/lib/file-appender.js"(exports2, module2) {
    var objectAssign = require_object_assign();
    function arrayRemove(arr, item) {
      var idx = arr.indexOf(item);
      if (~idx) arr.splice(idx, 1);
    }
    function FileAppender(strategy, req) {
      this.strategy = strategy;
      this.req = req;
      switch (strategy) {
        case "NONE":
          break;
        case "VALUE":
          break;
        case "ARRAY":
          req.files = [];
          break;
        case "OBJECT":
          req.files = /* @__PURE__ */ Object.create(null);
          break;
        default:
          throw new Error("Unknown file strategy: " + strategy);
      }
    }
    FileAppender.prototype.insertPlaceholder = function(file) {
      var placeholder = {
        fieldname: file.fieldname
      };
      switch (this.strategy) {
        case "NONE":
          break;
        case "VALUE":
          break;
        case "ARRAY":
          this.req.files.push(placeholder);
          break;
        case "OBJECT":
          if (this.req.files[file.fieldname]) {
            this.req.files[file.fieldname].push(placeholder);
          } else {
            this.req.files[file.fieldname] = [placeholder];
          }
          break;
      }
      return placeholder;
    };
    FileAppender.prototype.removePlaceholder = function(placeholder) {
      switch (this.strategy) {
        case "NONE":
          break;
        case "VALUE":
          break;
        case "ARRAY":
          arrayRemove(this.req.files, placeholder);
          break;
        case "OBJECT":
          if (this.req.files[placeholder.fieldname].length === 1) {
            delete this.req.files[placeholder.fieldname];
          } else {
            arrayRemove(this.req.files[placeholder.fieldname], placeholder);
          }
          break;
      }
    };
    FileAppender.prototype.replacePlaceholder = function(placeholder, file) {
      if (this.strategy === "VALUE") {
        this.req.file = file;
        return;
      }
      delete placeholder.fieldname;
      objectAssign(placeholder, file);
    };
    module2.exports = FileAppender;
  }
});

// ../node_modules/multer/lib/remove-uploaded-files.js
var require_remove_uploaded_files = __commonJS({
  "../node_modules/multer/lib/remove-uploaded-files.js"(exports2, module2) {
    function removeUploadedFiles(uploadedFiles, remove, cb) {
      var length = uploadedFiles.length;
      var errors = [];
      if (length === 0) return cb(null, errors);
      function handleFile(idx) {
        var file = uploadedFiles[idx];
        remove(file, function(err) {
          if (err) {
            err.file = file;
            err.field = file.fieldname;
            errors.push(err);
          }
          if (idx < length - 1) {
            handleFile(idx + 1);
          } else {
            cb(null, errors);
          }
        });
      }
      handleFile(0);
    }
    module2.exports = removeUploadedFiles;
  }
});

// ../node_modules/multer/lib/make-middleware.js
var require_make_middleware = __commonJS({
  "../node_modules/multer/lib/make-middleware.js"(exports2, module2) {
    var is = require_type_is();
    var Busboy = require_lib();
    var extend = require_immutable();
    var appendField = require_append_field();
    var Counter = require_counter();
    var MulterError = require_multer_error();
    var FileAppender = require_file_appender();
    var removeUploadedFiles = require_remove_uploaded_files();
    function drainStream(stream) {
      stream.on("readable", () => {
        while (stream.read() !== null) {
        }
      });
    }
    function makeMiddleware(setup) {
      return function multerMiddleware(req, res, next) {
        if (!is(req, ["multipart"])) return next();
        var options = setup();
        var limits = options.limits;
        var storage = options.storage;
        var fileFilter = options.fileFilter;
        var fileStrategy = options.fileStrategy;
        var preservePath = options.preservePath;
        req.body = /* @__PURE__ */ Object.create(null);
        req.on("error", function(err) {
          abortWithError(err);
        });
        var busboy;
        try {
          busboy = Busboy({ headers: req.headers, limits, preservePath });
        } catch (err) {
          return next(err);
        }
        var appender = new FileAppender(fileStrategy, req);
        var isDone = false;
        var readFinished = false;
        var errorOccured = false;
        var pendingWrites = new Counter();
        var uploadedFiles = [];
        function done(err) {
          if (isDone) return;
          isDone = true;
          req.unpipe(busboy);
          drainStream(req);
          req.resume();
          setImmediate(() => {
            busboy.removeAllListeners();
          });
          next(err);
        }
        function indicateDone() {
          if (readFinished && pendingWrites.isZero() && !errorOccured) done();
        }
        function abortWithError(uploadError) {
          if (errorOccured) return;
          errorOccured = true;
          pendingWrites.onceZero(function() {
            function remove(file, cb) {
              storage._removeFile(req, file, cb);
            }
            removeUploadedFiles(uploadedFiles, remove, function(err, storageErrors) {
              if (err) return done(err);
              uploadError.storageErrors = storageErrors;
              done(uploadError);
            });
          });
        }
        function abortWithCode(code, optionalField) {
          abortWithError(new MulterError(code, optionalField));
        }
        busboy.on("field", function(fieldname, value, { nameTruncated, valueTruncated }) {
          if (fieldname == null) return abortWithCode("MISSING_FIELD_NAME");
          if (nameTruncated) return abortWithCode("LIMIT_FIELD_KEY");
          if (valueTruncated) return abortWithCode("LIMIT_FIELD_VALUE", fieldname);
          if (limits && Object.prototype.hasOwnProperty.call(limits, "fieldNameSize")) {
            if (fieldname.length > limits.fieldNameSize) return abortWithCode("LIMIT_FIELD_KEY");
          }
          appendField(req.body, fieldname, value);
        });
        busboy.on("file", function(fieldname, fileStream, { filename, encoding, mimeType }) {
          var pendingWritesIncremented = false;
          fileStream.on("error", function(err) {
            if (pendingWritesIncremented) {
              pendingWrites.decrement();
            }
            abortWithError(err);
          });
          if (fieldname == null) return abortWithCode("MISSING_FIELD_NAME");
          if (!filename) return fileStream.resume();
          if (limits && Object.prototype.hasOwnProperty.call(limits, "fieldNameSize")) {
            if (fieldname.length > limits.fieldNameSize) return abortWithCode("LIMIT_FIELD_KEY");
          }
          var file = {
            fieldname,
            originalname: filename,
            encoding,
            mimetype: mimeType
          };
          var placeholder = appender.insertPlaceholder(file);
          fileFilter(req, file, function(err, includeFile) {
            if (err) {
              appender.removePlaceholder(placeholder);
              return abortWithError(err);
            }
            if (!includeFile) {
              appender.removePlaceholder(placeholder);
              return fileStream.resume();
            }
            var aborting = false;
            pendingWritesIncremented = true;
            pendingWrites.increment();
            Object.defineProperty(file, "stream", {
              configurable: true,
              enumerable: false,
              value: fileStream
            });
            fileStream.on("limit", function() {
              aborting = true;
              abortWithCode("LIMIT_FILE_SIZE", fieldname);
            });
            storage._handleFile(req, file, function(err2, info) {
              if (aborting) {
                appender.removePlaceholder(placeholder);
                uploadedFiles.push(extend(file, info));
                return pendingWrites.decrement();
              }
              if (err2) {
                appender.removePlaceholder(placeholder);
                pendingWrites.decrement();
                return abortWithError(err2);
              }
              var fileInfo = extend(file, info);
              appender.replacePlaceholder(placeholder, fileInfo);
              uploadedFiles.push(fileInfo);
              pendingWrites.decrement();
              indicateDone();
            });
          });
        });
        busboy.on("error", function(err) {
          abortWithError(err);
        });
        busboy.on("partsLimit", function() {
          abortWithCode("LIMIT_PART_COUNT");
        });
        busboy.on("filesLimit", function() {
          abortWithCode("LIMIT_FILE_COUNT");
        });
        busboy.on("fieldsLimit", function() {
          abortWithCode("LIMIT_FIELD_COUNT");
        });
        busboy.on("close", function() {
          readFinished = true;
          indicateDone();
        });
        req.pipe(busboy);
      };
    }
    module2.exports = makeMiddleware;
  }
});

// ../node_modules/mkdirp/index.js
var require_mkdirp = __commonJS({
  "../node_modules/mkdirp/index.js"(exports2, module2) {
    var path3 = require("path");
    var fs3 = require("fs");
    var _0777 = parseInt("0777", 8);
    module2.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
    function mkdirP(p, opts, f, made) {
      if (typeof opts === "function") {
        f = opts;
        opts = {};
      } else if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      var mode = opts.mode;
      var xfs = opts.fs || fs3;
      if (mode === void 0) {
        mode = _0777;
      }
      if (!made) made = null;
      var cb = f || /* istanbul ignore next */
      function() {
      };
      p = path3.resolve(p);
      xfs.mkdir(p, mode, function(er) {
        if (!er) {
          made = made || p;
          return cb(null, made);
        }
        switch (er.code) {
          case "ENOENT":
            if (path3.dirname(p) === p) return cb(er);
            mkdirP(path3.dirname(p), opts, function(er2, made2) {
              if (er2) cb(er2, made2);
              else mkdirP(p, opts, cb, made2);
            });
            break;
          // In the case of any other error, just see if there's a dir
          // there already.  If so, then hooray!  If not, then something
          // is borked.
          default:
            xfs.stat(p, function(er2, stat) {
              if (er2 || !stat.isDirectory()) cb(er, made);
              else cb(null, made);
            });
            break;
        }
      });
    }
    mkdirP.sync = function sync(p, opts, made) {
      if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      var mode = opts.mode;
      var xfs = opts.fs || fs3;
      if (mode === void 0) {
        mode = _0777;
      }
      if (!made) made = null;
      p = path3.resolve(p);
      try {
        xfs.mkdirSync(p, mode);
        made = made || p;
      } catch (err0) {
        switch (err0.code) {
          case "ENOENT":
            made = sync(path3.dirname(p), opts, made);
            sync(p, opts, made);
            break;
          // In the case of any other error, just see if there's a dir
          // there already.  If so, then hooray!  If not, then something
          // is borked.
          default:
            var stat;
            try {
              stat = xfs.statSync(p);
            } catch (err1) {
              throw err0;
            }
            if (!stat.isDirectory()) throw err0;
            break;
        }
      }
      return made;
    };
  }
});

// ../node_modules/multer/storage/disk.js
var require_disk = __commonJS({
  "../node_modules/multer/storage/disk.js"(exports2, module2) {
    var fs3 = require("fs");
    var os = require("os");
    var path3 = require("path");
    var crypto = require("crypto");
    var mkdirp = require_mkdirp();
    function getFilename(req, file, cb) {
      crypto.randomBytes(16, function(err, raw) {
        cb(err, err ? void 0 : raw.toString("hex"));
      });
    }
    function getDestination(req, file, cb) {
      cb(null, os.tmpdir());
    }
    function DiskStorage(opts) {
      this.getFilename = opts.filename || getFilename;
      if (typeof opts.destination === "string") {
        mkdirp.sync(opts.destination);
        this.getDestination = function($0, $1, cb) {
          cb(null, opts.destination);
        };
      } else {
        this.getDestination = opts.destination || getDestination;
      }
    }
    DiskStorage.prototype._handleFile = function _handleFile(req, file, cb) {
      var that = this;
      that.getDestination(req, file, function(err, destination) {
        if (err) return cb(err);
        that.getFilename(req, file, function(err2, filename) {
          if (err2) return cb(err2);
          var finalPath = path3.join(destination, filename);
          var outStream = fs3.createWriteStream(finalPath);
          file.stream.pipe(outStream);
          outStream.on("error", cb);
          outStream.on("finish", function() {
            cb(null, {
              destination,
              filename,
              path: finalPath,
              size: outStream.bytesWritten
            });
          });
        });
      });
    };
    DiskStorage.prototype._removeFile = function _removeFile(req, file, cb) {
      var path4 = file.path;
      delete file.destination;
      delete file.filename;
      delete file.path;
      fs3.unlink(path4, cb);
    };
    module2.exports = function(opts) {
      return new DiskStorage(opts);
    };
  }
});

// ../node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream = __commonJS({
  "../node_modules/readable-stream/lib/internal/streams/stream.js"(exports2, module2) {
    module2.exports = require("stream");
  }
});

// ../node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = __commonJS({
  "../node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports2, module2) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var _require = require("buffer");
    var Buffer2 = _require.Buffer;
    var _require2 = require("util");
    var inspect = _require2.inspect;
    var custom2 = inspect && inspect.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer2.prototype.copy.call(src, target, offset);
    }
    module2.exports = /* @__PURE__ */ (function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0) this.tail.next = entry;
          else this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0) this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0) return;
          var ret = this.head.data;
          if (this.length === 1) this.head = this.tail = null;
          else this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join(s) {
          if (this.length === 0) return "";
          var p = this.head;
          var ret = "" + p.data;
          while (p = p.next) ret += s + p.data;
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n) {
          if (this.length === 0) return Buffer2.alloc(0);
          var ret = Buffer2.allocUnsafe(n >>> 0);
          var p = this.head;
          var i = 0;
          while (p) {
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n, hasStrings) {
          var ret;
          if (n < this.head.data.length) {
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n) {
          var p = this.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length) ret += str;
            else ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n) {
          var ret = Buffer2.allocUnsafe(n);
          var p = this.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom2,
        value: function value(_, options) {
          return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    })();
  }
});

// ../node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  "../node_modules/readable-stream/lib/internal/streams/destroy.js"(exports2, module2) {
    "use strict";
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            process.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            process.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            process.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            process.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            process.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          process.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          process.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose) return;
      if (self2._readableState && !self2._readableState.emitClose) return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
      else stream.emit("error", err);
    }
    module2.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});

// ../node_modules/readable-stream/errors.js
var require_errors = __commonJS({
  "../node_modules/readable-stream/errors.js"(exports2, module2) {
    "use strict";
    var codes = {};
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      class NodeError extends Base {
        constructor(arg1, arg2, arg3) {
          super(getMessage(arg1, arg2, arg3));
        }
      }
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        const len = expected.length;
        expected = expected.map((i) => String(i));
        if (len > 2) {
          return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
        } else if (len === 2) {
          return `one of ${thing} ${expected[0]} or ${expected[1]}`;
        } else {
          return `of ${thing} ${expected[0]}`;
        }
      } else {
        return `of ${thing} ${String(expected)}`;
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      let determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      let msg;
      if (endsWith(name, " argument")) {
        msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`;
      } else {
        const type = includes(name, ".") ? "property" : "argument";
        msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, "type")}`;
      }
      msg += `. Received type ${typeof actual}`;
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module2.exports.codes = codes;
  }
});

// ../node_modules/readable-stream/lib/internal/streams/state.js
var require_state = __commonJS({
  "../node_modules/readable-stream/lib/internal/streams/state.js"(exports2, module2) {
    "use strict";
    var ERR_INVALID_OPT_VALUE = require_errors().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module2.exports = {
      getHighWaterMark
    };
  }
});

// ../node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "../node_modules/inherits/inherits_browser.js"(exports2, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// ../node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "../node_modules/inherits/inherits.js"(exports2, module2) {
    try {
      util2 = require("util");
      if (typeof util2.inherits !== "function") throw "";
      module2.exports = util2.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util2;
  }
});

// ../node_modules/util-deprecate/node.js
var require_node = __commonJS({
  "../node_modules/util-deprecate/node.js"(exports2, module2) {
    module2.exports = require("util").deprecate;
  }
});

// ../node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS({
  "../node_modules/readable-stream/lib/_stream_writable.js"(exports2, module2) {
    "use strict";
    module2.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex;
    Writable.WritableState = WritableState;
    var internalUtil = {
      deprecate: require_node()
    };
    var Stream = require_stream();
    var Buffer2 = require("buffer").Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    require_inherits()(Writable, Stream);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object)) return true;
          if (this !== Writable) return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      var isDuplex = this instanceof Duplex;
      if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
      }
      Stream.call(this);
    }
    Writable.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      process.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        process.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer2.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf) encoding = "buffer";
      else if (!encoding) encoding = state.defaultEncoding;
      if (typeof cb !== "function") cb = nop;
      if (state.ending) writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string") encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer2.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret) state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev) stream._writev(chunk, state.onwrite);
      else stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        process.nextTick(cb, er);
        process.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function") throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er) onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          process.nextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished) onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf) allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null) state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending) endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          process.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished) process.nextTick(cb);
        else stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});

// ../node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS({
  "../node_modules/readable-stream/lib/_stream_duplex.js"(exports2, module2) {
    "use strict";
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj) keys2.push(key);
      return keys2;
    };
    module2.exports = Duplex;
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    require_inherits()(Duplex, Readable);
    {
      keys = objectKeys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    var keys;
    var method;
    var v;
    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false) this.readable = false;
        if (options.writable === false) this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended) return;
      process.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  }
});

// ../node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "../node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// ../node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS({
  "../node_modules/string_decoder/lib/string_decoder.js"(exports2) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var isEncoding = Buffer2.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc) return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried) return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports2.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer2.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0) return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0) return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127) return 0;
      else if (byte >> 5 === 6) return 2;
      else if (byte >> 4 === 14) return 3;
      else if (byte >> 3 === 30) return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0;
          else self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "\uFFFD";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "\uFFFD";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== void 0) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + "\uFFFD";
      return r;
    }
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0) return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  }
});

// ../node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream = __commonJS({
  "../node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports2, module2) {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once(callback) {
      var called = false;
      return function() {
        if (called) return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function") return eos(stream, null, opts);
      if (!opts) opts = {};
      callback = once(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable) onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable) callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable) callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false) stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module2.exports = eos;
  }
});

// ../node_modules/readable-stream/lib/internal/streams/async_iterator.js
var require_async_iterator = __commonJS({
  "../node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports2, module2) {
    "use strict";
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var finished = require_end_of_stream();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve = iter[kLastResolve];
      if (resolve !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      process.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve, reject) {
            process.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve = iterator[kLastResolve];
        if (resolve !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module2.exports = createReadableStreamAsyncIterator;
  }
});

// ../node_modules/readable-stream/lib/internal/streams/from.js
var require_from = __commonJS({
  "../node_modules/readable-stream/lib/internal/streams/from.js"(exports2, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self2 = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self2, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var ERR_INVALID_ARG_TYPE = require_errors().codes.ERR_INVALID_ARG_TYPE;
    function from(Readable, iterable, opts) {
      var iterator;
      if (iterable && typeof iterable.next === "function") {
        iterator = iterable;
      } else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();
      else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();
      else throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
      var readable = new Readable(_objectSpread({
        objectMode: true
      }, opts));
      var reading = false;
      readable._read = function() {
        if (!reading) {
          reading = true;
          next();
        }
      };
      function next() {
        return _next2.apply(this, arguments);
      }
      function _next2() {
        _next2 = _asyncToGenerator(function* () {
          try {
            var _yield$iterator$next = yield iterator.next(), value = _yield$iterator$next.value, done = _yield$iterator$next.done;
            if (done) {
              readable.push(null);
            } else if (readable.push(yield value)) {
              next();
            } else {
              reading = false;
            }
          } catch (err) {
            readable.destroy(err);
          }
        });
        return _next2.apply(this, arguments);
      }
      return readable;
    }
    module2.exports = from;
  }
});

// ../node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS({
  "../node_modules/readable-stream/lib/_stream_readable.js"(exports2, module2) {
    "use strict";
    module2.exports = Readable;
    var Duplex;
    Readable.ReadableState = ReadableState;
    var EE = require("events").EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream = require_stream();
    var Buffer2 = require("buffer").Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = require("util");
    var debug;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog("stream");
    } else {
      debug = function debug2() {
      };
    }
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder;
    var createReadableStreamAsyncIterator;
    var from;
    require_inherits()(Readable, Stream);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
      else emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable)) return new Readable(options);
      var isDuplex = this instanceof Duplex;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
      }
      Stream.call(this);
    }
    Object.defineProperty(Readable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck) er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
              else maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
      var decoder = new StringDecoder(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p = this._readableState.buffer.head;
      var content = "";
      while (p !== null) {
        content += decoder.write(p.data);
        p = p.next;
      }
      this._readableState.buffer.clear();
      if (content !== "") this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended) return 0;
      if (state.objectMode) return 1;
      if (n !== n) {
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
      }
      if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length) return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable.prototype.read = function(n) {
      debug("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0) state.emittedReadable = false;
      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0) state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading) n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0) ret = fromList(n, state);
      else ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended) state.needReadable = true;
        if (nOrig !== n && state.ended) endReadable(this);
      }
      if (ret !== null) this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug("onEofChunk");
      if (state.ended) return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        process.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted) process.nextTick(endFn);
      else src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        var ret = dest.write(chunk);
        debug("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0) errorOrDestroy(dest, er);
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0) return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, {
          hasUnpiped: false
        });
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1) return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1) state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false) this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            process.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.removeListener = function(ev, fn) {
      var res = Stream.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable.prototype.removeAllListeners = function(ev) {
      var res = Stream.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug("readable nexttick read 0");
      self2.read(0);
    }
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading) stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug("flow", state.flowing);
      while (state.flowing && stream.read() !== null) ;
    }
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder) chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = /* @__PURE__ */ (function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          })(i);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable._fromList = fromList;
    Object.defineProperty(Readable.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n, state) {
      if (state.length === 0) return null;
      var ret;
      if (state.objectMode) ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder) ret = state.buffer.join("");
        else if (state.buffer.length === 1) ret = state.buffer.first();
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from();
        }
        return from(Readable, iterable, opts);
      };
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
      }
      return -1;
    }
  }
});

// ../node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS({
  "../node_modules/readable-stream/lib/_stream_transform.js"(exports2, module2) {
    "use strict";
    module2.exports = Transform;
    var _require$codes = require_errors().codes;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
    var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex = require_stream_duplex();
    require_inherits()(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function(err, cb) {
      Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
      });
    };
    function done(stream, er, data) {
      if (er) return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
  }
});

// ../node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS({
  "../node_modules/readable-stream/lib/_stream_passthrough.js"(exports2, module2) {
    "use strict";
    module2.exports = PassThrough;
    var Transform = require_stream_transform();
    require_inherits()(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// ../node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = __commonJS({
  "../node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports2, module2) {
    "use strict";
    var eos;
    function once(callback) {
      var called = false;
      return function() {
        if (called) return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }
    var _require$codes = require_errors().codes;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    function noop(err) {
      if (err) throw err;
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function destroyer(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      if (eos === void 0) eos = require_end_of_stream();
      eos(stream, {
        readable: reading,
        writable: writing
      }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        if (isRequest(stream)) return stream.abort();
        if (typeof stream.destroy === "function") return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED("pipe"));
      };
    }
    function call(fn) {
      fn();
    }
    function pipe(from, to) {
      return from.pipe(to);
    }
    function popCallback(streams) {
      if (!streams.length) return noop;
      if (typeof streams[streams.length - 1] !== "function") return noop;
      return streams.pop();
    }
    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }
      var callback = popCallback(streams);
      if (Array.isArray(streams[0])) streams = streams[0];
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error) error = err;
          if (err) destroys.forEach(call);
          if (reading) return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }
    module2.exports = pipeline;
  }
});

// ../node_modules/readable-stream/readable.js
var require_readable = __commonJS({
  "../node_modules/readable-stream/readable.js"(exports2, module2) {
    var Stream = require("stream");
    if (process.env.READABLE_STREAM === "disable" && Stream) {
      module2.exports = Stream.Readable;
      Object.assign(module2.exports, Stream);
      module2.exports.Stream = Stream;
    } else {
      exports2 = module2.exports = require_stream_readable();
      exports2.Stream = Stream || exports2;
      exports2.Readable = exports2;
      exports2.Writable = require_stream_writable();
      exports2.Duplex = require_stream_duplex();
      exports2.Transform = require_stream_transform();
      exports2.PassThrough = require_stream_passthrough();
      exports2.finished = require_end_of_stream();
      exports2.pipeline = require_pipeline();
    }
  }
});

// ../node_modules/buffer-from/index.js
var require_buffer_from = __commonJS({
  "../node_modules/buffer-from/index.js"(exports2, module2) {
    var toString = Object.prototype.toString;
    var isModern = typeof Buffer !== "undefined" && typeof Buffer.alloc === "function" && typeof Buffer.allocUnsafe === "function" && typeof Buffer.from === "function";
    function isArrayBuffer(input) {
      return toString.call(input).slice(8, -1) === "ArrayBuffer";
    }
    function fromArrayBuffer(obj, byteOffset, length) {
      byteOffset >>>= 0;
      var maxLength = obj.byteLength - byteOffset;
      if (maxLength < 0) {
        throw new RangeError("'offset' is out of bounds");
      }
      if (length === void 0) {
        length = maxLength;
      } else {
        length >>>= 0;
        if (length > maxLength) {
          throw new RangeError("'length' is out of bounds");
        }
      }
      return isModern ? Buffer.from(obj.slice(byteOffset, byteOffset + length)) : new Buffer(new Uint8Array(obj.slice(byteOffset, byteOffset + length)));
    }
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('"encoding" must be a valid string encoding');
      }
      return isModern ? Buffer.from(string, encoding) : new Buffer(string, encoding);
    }
    function bufferFrom(value, encodingOrOffset, length) {
      if (typeof value === "number") {
        throw new TypeError('"value" argument must not be a number');
      }
      if (isArrayBuffer(value)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      return isModern ? Buffer.from(value) : new Buffer(value);
    }
    module2.exports = bufferFrom;
  }
});

// ../node_modules/typedarray/index.js
var require_typedarray = __commonJS({
  "../node_modules/typedarray/index.js"(exports2) {
    var undefined2 = void 0;
    var MAX_ARRAY_LENGTH = 1e5;
    var ECMAScript = /* @__PURE__ */ (function() {
      var opts = Object.prototype.toString, ophop = Object.prototype.hasOwnProperty;
      return {
        // Class returns internal [[Class]] property, used to avoid cross-frame instanceof issues:
        Class: function(v) {
          return opts.call(v).replace(/^\[object *|\]$/g, "");
        },
        HasProperty: function(o, p) {
          return p in o;
        },
        HasOwnProperty: function(o, p) {
          return ophop.call(o, p);
        },
        IsCallable: function(o) {
          return typeof o === "function";
        },
        ToInt32: function(v) {
          return v >> 0;
        },
        ToUint32: function(v) {
          return v >>> 0;
        }
      };
    })();
    var LN2 = Math.LN2;
    var abs = Math.abs;
    var floor = Math.floor;
    var log = Math.log;
    var min = Math.min;
    var pow = Math.pow;
    var round = Math.round;
    function configureProperties(obj) {
      if (getOwnPropNames && defineProp) {
        var props = getOwnPropNames(obj), i;
        for (i = 0; i < props.length; i += 1) {
          defineProp(obj, props[i], {
            value: obj[props[i]],
            writable: false,
            enumerable: false,
            configurable: false
          });
        }
      }
    }
    var defineProp;
    if (Object.defineProperty && (function() {
      try {
        Object.defineProperty({}, "x", {});
        return true;
      } catch (e) {
        return false;
      }
    })()) {
      defineProp = Object.defineProperty;
    } else {
      defineProp = function(o, p, desc) {
        if (!o === Object(o)) throw new TypeError("Object.defineProperty called on non-object");
        if (ECMAScript.HasProperty(desc, "get") && Object.prototype.__defineGetter__) {
          Object.prototype.__defineGetter__.call(o, p, desc.get);
        }
        if (ECMAScript.HasProperty(desc, "set") && Object.prototype.__defineSetter__) {
          Object.prototype.__defineSetter__.call(o, p, desc.set);
        }
        if (ECMAScript.HasProperty(desc, "value")) {
          o[p] = desc.value;
        }
        return o;
      };
    }
    var getOwnPropNames = Object.getOwnPropertyNames || function(o) {
      if (o !== Object(o)) throw new TypeError("Object.getOwnPropertyNames called on non-object");
      var props = [], p;
      for (p in o) {
        if (ECMAScript.HasOwnProperty(o, p)) {
          props.push(p);
        }
      }
      return props;
    };
    function makeArrayAccessors(obj) {
      if (!defineProp) {
        return;
      }
      if (obj.length > MAX_ARRAY_LENGTH) throw new RangeError("Array too large for polyfill");
      function makeArrayAccessor(index) {
        defineProp(obj, index, {
          "get": function() {
            return obj._getter(index);
          },
          "set": function(v) {
            obj._setter(index, v);
          },
          enumerable: true,
          configurable: false
        });
      }
      var i;
      for (i = 0; i < obj.length; i += 1) {
        makeArrayAccessor(i);
      }
    }
    function as_signed(value, bits) {
      var s = 32 - bits;
      return value << s >> s;
    }
    function as_unsigned(value, bits) {
      var s = 32 - bits;
      return value << s >>> s;
    }
    function packI8(n) {
      return [n & 255];
    }
    function unpackI8(bytes) {
      return as_signed(bytes[0], 8);
    }
    function packU8(n) {
      return [n & 255];
    }
    function unpackU8(bytes) {
      return as_unsigned(bytes[0], 8);
    }
    function packU8Clamped(n) {
      n = round(Number(n));
      return [n < 0 ? 0 : n > 255 ? 255 : n & 255];
    }
    function packI16(n) {
      return [n >> 8 & 255, n & 255];
    }
    function unpackI16(bytes) {
      return as_signed(bytes[0] << 8 | bytes[1], 16);
    }
    function packU16(n) {
      return [n >> 8 & 255, n & 255];
    }
    function unpackU16(bytes) {
      return as_unsigned(bytes[0] << 8 | bytes[1], 16);
    }
    function packI32(n) {
      return [n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255];
    }
    function unpackI32(bytes) {
      return as_signed(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32);
    }
    function packU32(n) {
      return [n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255];
    }
    function unpackU32(bytes) {
      return as_unsigned(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32);
    }
    function packIEEE754(v, ebits, fbits) {
      var bias = (1 << ebits - 1) - 1, s, e, f, ln, i, bits, str, bytes;
      function roundToEven(n) {
        var w = floor(n), f2 = n - w;
        if (f2 < 0.5)
          return w;
        if (f2 > 0.5)
          return w + 1;
        return w % 2 ? w + 1 : w;
      }
      if (v !== v) {
        e = (1 << ebits) - 1;
        f = pow(2, fbits - 1);
        s = 0;
      } else if (v === Infinity || v === -Infinity) {
        e = (1 << ebits) - 1;
        f = 0;
        s = v < 0 ? 1 : 0;
      } else if (v === 0) {
        e = 0;
        f = 0;
        s = 1 / v === -Infinity ? 1 : 0;
      } else {
        s = v < 0;
        v = abs(v);
        if (v >= pow(2, 1 - bias)) {
          e = min(floor(log(v) / LN2), 1023);
          f = roundToEven(v / pow(2, e) * pow(2, fbits));
          if (f / pow(2, fbits) >= 2) {
            e = e + 1;
            f = 1;
          }
          if (e > bias) {
            e = (1 << ebits) - 1;
            f = 0;
          } else {
            e = e + bias;
            f = f - pow(2, fbits);
          }
        } else {
          e = 0;
          f = roundToEven(v / pow(2, 1 - bias - fbits));
        }
      }
      bits = [];
      for (i = fbits; i; i -= 1) {
        bits.push(f % 2 ? 1 : 0);
        f = floor(f / 2);
      }
      for (i = ebits; i; i -= 1) {
        bits.push(e % 2 ? 1 : 0);
        e = floor(e / 2);
      }
      bits.push(s ? 1 : 0);
      bits.reverse();
      str = bits.join("");
      bytes = [];
      while (str.length) {
        bytes.push(parseInt(str.substring(0, 8), 2));
        str = str.substring(8);
      }
      return bytes;
    }
    function unpackIEEE754(bytes, ebits, fbits) {
      var bits = [], i, j, b, str, bias, s, e, f;
      for (i = bytes.length; i; i -= 1) {
        b = bytes[i - 1];
        for (j = 8; j; j -= 1) {
          bits.push(b % 2 ? 1 : 0);
          b = b >> 1;
        }
      }
      bits.reverse();
      str = bits.join("");
      bias = (1 << ebits - 1) - 1;
      s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
      e = parseInt(str.substring(1, 1 + ebits), 2);
      f = parseInt(str.substring(1 + ebits), 2);
      if (e === (1 << ebits) - 1) {
        return f !== 0 ? NaN : s * Infinity;
      } else if (e > 0) {
        return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
      } else if (f !== 0) {
        return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
      } else {
        return s < 0 ? -0 : 0;
      }
    }
    function unpackF64(b) {
      return unpackIEEE754(b, 11, 52);
    }
    function packF64(v) {
      return packIEEE754(v, 11, 52);
    }
    function unpackF32(b) {
      return unpackIEEE754(b, 8, 23);
    }
    function packF32(v) {
      return packIEEE754(v, 8, 23);
    }
    (function() {
      var ArrayBuffer = function ArrayBuffer2(length) {
        length = ECMAScript.ToInt32(length);
        if (length < 0) throw new RangeError("ArrayBuffer size is not a small enough positive integer");
        this.byteLength = length;
        this._bytes = [];
        this._bytes.length = length;
        var i;
        for (i = 0; i < this.byteLength; i += 1) {
          this._bytes[i] = 0;
        }
        configureProperties(this);
      };
      exports2.ArrayBuffer = exports2.ArrayBuffer || ArrayBuffer;
      var ArrayBufferView = function ArrayBufferView2() {
      };
      function makeConstructor(bytesPerElement, pack, unpack) {
        var ctor;
        ctor = function(buffer, byteOffset, length) {
          var array, sequence, i, s;
          if (!arguments.length || typeof arguments[0] === "number") {
            this.length = ECMAScript.ToInt32(arguments[0]);
            if (length < 0) throw new RangeError("ArrayBufferView size is not a small enough positive integer");
            this.byteLength = this.length * this.BYTES_PER_ELEMENT;
            this.buffer = new ArrayBuffer(this.byteLength);
            this.byteOffset = 0;
          } else if (typeof arguments[0] === "object" && arguments[0].constructor === ctor) {
            array = arguments[0];
            this.length = array.length;
            this.byteLength = this.length * this.BYTES_PER_ELEMENT;
            this.buffer = new ArrayBuffer(this.byteLength);
            this.byteOffset = 0;
            for (i = 0; i < this.length; i += 1) {
              this._setter(i, array._getter(i));
            }
          } else if (typeof arguments[0] === "object" && !(arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === "ArrayBuffer")) {
            sequence = arguments[0];
            this.length = ECMAScript.ToUint32(sequence.length);
            this.byteLength = this.length * this.BYTES_PER_ELEMENT;
            this.buffer = new ArrayBuffer(this.byteLength);
            this.byteOffset = 0;
            for (i = 0; i < this.length; i += 1) {
              s = sequence[i];
              this._setter(i, Number(s));
            }
          } else if (typeof arguments[0] === "object" && (arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === "ArrayBuffer")) {
            this.buffer = buffer;
            this.byteOffset = ECMAScript.ToUint32(byteOffset);
            if (this.byteOffset > this.buffer.byteLength) {
              throw new RangeError("byteOffset out of range");
            }
            if (this.byteOffset % this.BYTES_PER_ELEMENT) {
              throw new RangeError("ArrayBuffer length minus the byteOffset is not a multiple of the element size.");
            }
            if (arguments.length < 3) {
              this.byteLength = this.buffer.byteLength - this.byteOffset;
              if (this.byteLength % this.BYTES_PER_ELEMENT) {
                throw new RangeError("length of buffer minus byteOffset not a multiple of the element size");
              }
              this.length = this.byteLength / this.BYTES_PER_ELEMENT;
            } else {
              this.length = ECMAScript.ToUint32(length);
              this.byteLength = this.length * this.BYTES_PER_ELEMENT;
            }
            if (this.byteOffset + this.byteLength > this.buffer.byteLength) {
              throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
            }
          } else {
            throw new TypeError("Unexpected argument type(s)");
          }
          this.constructor = ctor;
          configureProperties(this);
          makeArrayAccessors(this);
        };
        ctor.prototype = new ArrayBufferView();
        ctor.prototype.BYTES_PER_ELEMENT = bytesPerElement;
        ctor.prototype._pack = pack;
        ctor.prototype._unpack = unpack;
        ctor.BYTES_PER_ELEMENT = bytesPerElement;
        ctor.prototype._getter = function(index) {
          if (arguments.length < 1) throw new SyntaxError("Not enough arguments");
          index = ECMAScript.ToUint32(index);
          if (index >= this.length) {
            return undefined2;
          }
          var bytes = [], i, o;
          for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT; i < this.BYTES_PER_ELEMENT; i += 1, o += 1) {
            bytes.push(this.buffer._bytes[o]);
          }
          return this._unpack(bytes);
        };
        ctor.prototype.get = ctor.prototype._getter;
        ctor.prototype._setter = function(index, value) {
          if (arguments.length < 2) throw new SyntaxError("Not enough arguments");
          index = ECMAScript.ToUint32(index);
          if (index >= this.length) {
            return undefined2;
          }
          var bytes = this._pack(value), i, o;
          for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT; i < this.BYTES_PER_ELEMENT; i += 1, o += 1) {
            this.buffer._bytes[o] = bytes[i];
          }
        };
        ctor.prototype.set = function(index, value) {
          if (arguments.length < 1) throw new SyntaxError("Not enough arguments");
          var array, sequence, offset, len, i, s, d, byteOffset, byteLength, tmp;
          if (typeof arguments[0] === "object" && arguments[0].constructor === this.constructor) {
            array = arguments[0];
            offset = ECMAScript.ToUint32(arguments[1]);
            if (offset + array.length > this.length) {
              throw new RangeError("Offset plus length of array is out of range");
            }
            byteOffset = this.byteOffset + offset * this.BYTES_PER_ELEMENT;
            byteLength = array.length * this.BYTES_PER_ELEMENT;
            if (array.buffer === this.buffer) {
              tmp = [];
              for (i = 0, s = array.byteOffset; i < byteLength; i += 1, s += 1) {
                tmp[i] = array.buffer._bytes[s];
              }
              for (i = 0, d = byteOffset; i < byteLength; i += 1, d += 1) {
                this.buffer._bytes[d] = tmp[i];
              }
            } else {
              for (i = 0, s = array.byteOffset, d = byteOffset; i < byteLength; i += 1, s += 1, d += 1) {
                this.buffer._bytes[d] = array.buffer._bytes[s];
              }
            }
          } else if (typeof arguments[0] === "object" && typeof arguments[0].length !== "undefined") {
            sequence = arguments[0];
            len = ECMAScript.ToUint32(sequence.length);
            offset = ECMAScript.ToUint32(arguments[1]);
            if (offset + len > this.length) {
              throw new RangeError("Offset plus length of array is out of range");
            }
            for (i = 0; i < len; i += 1) {
              s = sequence[i];
              this._setter(offset + i, Number(s));
            }
          } else {
            throw new TypeError("Unexpected argument type(s)");
          }
        };
        ctor.prototype.subarray = function(start, end) {
          function clamp(v, min2, max) {
            return v < min2 ? min2 : v > max ? max : v;
          }
          start = ECMAScript.ToInt32(start);
          end = ECMAScript.ToInt32(end);
          if (arguments.length < 1) {
            start = 0;
          }
          if (arguments.length < 2) {
            end = this.length;
          }
          if (start < 0) {
            start = this.length + start;
          }
          if (end < 0) {
            end = this.length + end;
          }
          start = clamp(start, 0, this.length);
          end = clamp(end, 0, this.length);
          var len = end - start;
          if (len < 0) {
            len = 0;
          }
          return new this.constructor(
            this.buffer,
            this.byteOffset + start * this.BYTES_PER_ELEMENT,
            len
          );
        };
        return ctor;
      }
      var Int8Array = makeConstructor(1, packI8, unpackI8);
      var Uint8Array2 = makeConstructor(1, packU8, unpackU8);
      var Uint8ClampedArray = makeConstructor(1, packU8Clamped, unpackU8);
      var Int16Array = makeConstructor(2, packI16, unpackI16);
      var Uint16Array = makeConstructor(2, packU16, unpackU16);
      var Int32Array = makeConstructor(4, packI32, unpackI32);
      var Uint32Array = makeConstructor(4, packU32, unpackU32);
      var Float32Array = makeConstructor(4, packF32, unpackF32);
      var Float64Array = makeConstructor(8, packF64, unpackF64);
      exports2.Int8Array = exports2.Int8Array || Int8Array;
      exports2.Uint8Array = exports2.Uint8Array || Uint8Array2;
      exports2.Uint8ClampedArray = exports2.Uint8ClampedArray || Uint8ClampedArray;
      exports2.Int16Array = exports2.Int16Array || Int16Array;
      exports2.Uint16Array = exports2.Uint16Array || Uint16Array;
      exports2.Int32Array = exports2.Int32Array || Int32Array;
      exports2.Uint32Array = exports2.Uint32Array || Uint32Array;
      exports2.Float32Array = exports2.Float32Array || Float32Array;
      exports2.Float64Array = exports2.Float64Array || Float64Array;
    })();
    (function() {
      function r(array, index) {
        return ECMAScript.IsCallable(array.get) ? array.get(index) : array[index];
      }
      var IS_BIG_ENDIAN = (function() {
        var u16array = new exports2.Uint16Array([4660]), u8array = new exports2.Uint8Array(u16array.buffer);
        return r(u8array, 0) === 18;
      })();
      var DataView = function DataView2(buffer, byteOffset, byteLength) {
        if (arguments.length === 0) {
          buffer = new exports2.ArrayBuffer(0);
        } else if (!(buffer instanceof exports2.ArrayBuffer || ECMAScript.Class(buffer) === "ArrayBuffer")) {
          throw new TypeError("TypeError");
        }
        this.buffer = buffer || new exports2.ArrayBuffer(0);
        this.byteOffset = ECMAScript.ToUint32(byteOffset);
        if (this.byteOffset > this.buffer.byteLength) {
          throw new RangeError("byteOffset out of range");
        }
        if (arguments.length < 3) {
          this.byteLength = this.buffer.byteLength - this.byteOffset;
        } else {
          this.byteLength = ECMAScript.ToUint32(byteLength);
        }
        if (this.byteOffset + this.byteLength > this.buffer.byteLength) {
          throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
        }
        configureProperties(this);
      };
      function makeGetter(arrayType2) {
        return function(byteOffset, littleEndian) {
          byteOffset = ECMAScript.ToUint32(byteOffset);
          if (byteOffset + arrayType2.BYTES_PER_ELEMENT > this.byteLength) {
            throw new RangeError("Array index out of range");
          }
          byteOffset += this.byteOffset;
          var uint8Array = new exports2.Uint8Array(this.buffer, byteOffset, arrayType2.BYTES_PER_ELEMENT), bytes = [], i;
          for (i = 0; i < arrayType2.BYTES_PER_ELEMENT; i += 1) {
            bytes.push(r(uint8Array, i));
          }
          if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
            bytes.reverse();
          }
          return r(new arrayType2(new exports2.Uint8Array(bytes).buffer), 0);
        };
      }
      DataView.prototype.getUint8 = makeGetter(exports2.Uint8Array);
      DataView.prototype.getInt8 = makeGetter(exports2.Int8Array);
      DataView.prototype.getUint16 = makeGetter(exports2.Uint16Array);
      DataView.prototype.getInt16 = makeGetter(exports2.Int16Array);
      DataView.prototype.getUint32 = makeGetter(exports2.Uint32Array);
      DataView.prototype.getInt32 = makeGetter(exports2.Int32Array);
      DataView.prototype.getFloat32 = makeGetter(exports2.Float32Array);
      DataView.prototype.getFloat64 = makeGetter(exports2.Float64Array);
      function makeSetter(arrayType2) {
        return function(byteOffset, value, littleEndian) {
          byteOffset = ECMAScript.ToUint32(byteOffset);
          if (byteOffset + arrayType2.BYTES_PER_ELEMENT > this.byteLength) {
            throw new RangeError("Array index out of range");
          }
          var typeArray = new arrayType2([value]), byteArray = new exports2.Uint8Array(typeArray.buffer), bytes = [], i, byteView;
          for (i = 0; i < arrayType2.BYTES_PER_ELEMENT; i += 1) {
            bytes.push(r(byteArray, i));
          }
          if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
            bytes.reverse();
          }
          byteView = new exports2.Uint8Array(this.buffer, byteOffset, arrayType2.BYTES_PER_ELEMENT);
          byteView.set(bytes);
        };
      }
      DataView.prototype.setUint8 = makeSetter(exports2.Uint8Array);
      DataView.prototype.setInt8 = makeSetter(exports2.Int8Array);
      DataView.prototype.setUint16 = makeSetter(exports2.Uint16Array);
      DataView.prototype.setInt16 = makeSetter(exports2.Int16Array);
      DataView.prototype.setUint32 = makeSetter(exports2.Uint32Array);
      DataView.prototype.setInt32 = makeSetter(exports2.Int32Array);
      DataView.prototype.setFloat32 = makeSetter(exports2.Float32Array);
      DataView.prototype.setFloat64 = makeSetter(exports2.Float64Array);
      exports2.DataView = exports2.DataView || DataView;
    })();
  }
});

// ../node_modules/concat-stream/index.js
var require_concat_stream = __commonJS({
  "../node_modules/concat-stream/index.js"(exports2, module2) {
    var Writable = require_readable().Writable;
    var inherits = require_inherits();
    var bufferFrom = require_buffer_from();
    if (typeof Uint8Array === "undefined") {
      U8 = require_typedarray().Uint8Array;
    } else {
      U8 = Uint8Array;
    }
    var U8;
    function ConcatStream(opts, cb) {
      if (!(this instanceof ConcatStream)) return new ConcatStream(opts, cb);
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      if (!opts) opts = {};
      var encoding = opts.encoding;
      var shouldInferEncoding = false;
      if (!encoding) {
        shouldInferEncoding = true;
      } else {
        encoding = String(encoding).toLowerCase();
        if (encoding === "u8" || encoding === "uint8") {
          encoding = "uint8array";
        }
      }
      Writable.call(this, { objectMode: true });
      this.encoding = encoding;
      this.shouldInferEncoding = shouldInferEncoding;
      if (cb) this.on("finish", function() {
        cb(this.getBody());
      });
      this.body = [];
    }
    module2.exports = ConcatStream;
    inherits(ConcatStream, Writable);
    ConcatStream.prototype._write = function(chunk, enc, next) {
      this.body.push(chunk);
      next();
    };
    ConcatStream.prototype.inferEncoding = function(buff) {
      var firstBuffer = buff === void 0 ? this.body[0] : buff;
      if (Buffer.isBuffer(firstBuffer)) return "buffer";
      if (typeof Uint8Array !== "undefined" && firstBuffer instanceof Uint8Array) return "uint8array";
      if (Array.isArray(firstBuffer)) return "array";
      if (typeof firstBuffer === "string") return "string";
      if (Object.prototype.toString.call(firstBuffer) === "[object Object]") return "object";
      return "buffer";
    };
    ConcatStream.prototype.getBody = function() {
      if (!this.encoding && this.body.length === 0) return [];
      if (this.shouldInferEncoding) this.encoding = this.inferEncoding();
      if (this.encoding === "array") return arrayConcat(this.body);
      if (this.encoding === "string") return stringConcat(this.body);
      if (this.encoding === "buffer") return bufferConcat(this.body);
      if (this.encoding === "uint8array") return u8Concat(this.body);
      return this.body;
    };
    function isArrayish(arr) {
      return /Array\]$/.test(Object.prototype.toString.call(arr));
    }
    function isBufferish(p) {
      return typeof p === "string" || isArrayish(p) || p && typeof p.subarray === "function";
    }
    function stringConcat(parts) {
      var strings = [];
      var needsToString = false;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (typeof p === "string") {
          strings.push(p);
        } else if (Buffer.isBuffer(p)) {
          strings.push(p);
        } else if (isBufferish(p)) {
          strings.push(bufferFrom(p));
        } else {
          strings.push(bufferFrom(String(p)));
        }
      }
      if (Buffer.isBuffer(parts[0])) {
        strings = Buffer.concat(strings);
        strings = strings.toString("utf8");
      } else {
        strings = strings.join("");
      }
      return strings;
    }
    function bufferConcat(parts) {
      var bufs = [];
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (Buffer.isBuffer(p)) {
          bufs.push(p);
        } else if (isBufferish(p)) {
          bufs.push(bufferFrom(p));
        } else {
          bufs.push(bufferFrom(String(p)));
        }
      }
      return Buffer.concat(bufs);
    }
    function arrayConcat(parts) {
      var res = [];
      for (var i = 0; i < parts.length; i++) {
        res.push.apply(res, parts[i]);
      }
      return res;
    }
    function u8Concat(parts) {
      var len = 0;
      for (var i = 0; i < parts.length; i++) {
        if (typeof parts[i] === "string") {
          parts[i] = bufferFrom(parts[i]);
        }
        len += parts[i].length;
      }
      var u8 = new U8(len);
      for (var i = 0, offset = 0; i < parts.length; i++) {
        var part = parts[i];
        for (var j = 0; j < part.length; j++) {
          u8[offset++] = part[j];
        }
      }
      return u8;
    }
  }
});

// ../node_modules/multer/storage/memory.js
var require_memory = __commonJS({
  "../node_modules/multer/storage/memory.js"(exports2, module2) {
    var concat = require_concat_stream();
    function MemoryStorage(opts) {
    }
    MemoryStorage.prototype._handleFile = function _handleFile(req, file, cb) {
      file.stream.pipe(concat({ encoding: "buffer" }, function(data) {
        cb(null, {
          buffer: data,
          size: data.length
        });
      }));
    };
    MemoryStorage.prototype._removeFile = function _removeFile(req, file, cb) {
      delete file.buffer;
      cb(null);
    };
    module2.exports = function(opts) {
      return new MemoryStorage(opts);
    };
  }
});

// ../node_modules/multer/index.js
var require_multer = __commonJS({
  "../node_modules/multer/index.js"(exports2, module2) {
    var makeMiddleware = require_make_middleware();
    var diskStorage = require_disk();
    var memoryStorage = require_memory();
    var MulterError = require_multer_error();
    function allowAll(req, file, cb) {
      cb(null, true);
    }
    function Multer(options) {
      if (options.storage) {
        this.storage = options.storage;
      } else if (options.dest) {
        this.storage = diskStorage({ destination: options.dest });
      } else {
        this.storage = memoryStorage();
      }
      this.limits = options.limits;
      this.preservePath = options.preservePath;
      this.fileFilter = options.fileFilter || allowAll;
    }
    Multer.prototype._makeMiddleware = function(fields, fileStrategy) {
      function setup() {
        var fileFilter = this.fileFilter;
        var filesLeft = /* @__PURE__ */ Object.create(null);
        fields.forEach(function(field) {
          if (typeof field.maxCount === "number") {
            filesLeft[field.name] = field.maxCount;
          } else {
            filesLeft[field.name] = Infinity;
          }
        });
        function wrappedFileFilter(req, file, cb) {
          if ((filesLeft[file.fieldname] || 0) <= 0) {
            return cb(new MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
          }
          filesLeft[file.fieldname] -= 1;
          fileFilter(req, file, cb);
        }
        return {
          limits: this.limits,
          preservePath: this.preservePath,
          storage: this.storage,
          fileFilter: wrappedFileFilter,
          fileStrategy
        };
      }
      return makeMiddleware(setup.bind(this));
    };
    Multer.prototype.single = function(name) {
      return this._makeMiddleware([{ name, maxCount: 1 }], "VALUE");
    };
    Multer.prototype.array = function(name, maxCount) {
      return this._makeMiddleware([{ name, maxCount }], "ARRAY");
    };
    Multer.prototype.fields = function(fields) {
      return this._makeMiddleware(fields, "OBJECT");
    };
    Multer.prototype.none = function() {
      return this._makeMiddleware([], "NONE");
    };
    Multer.prototype.any = function() {
      function setup() {
        return {
          limits: this.limits,
          preservePath: this.preservePath,
          storage: this.storage,
          fileFilter: this.fileFilter,
          fileStrategy: "ARRAY"
        };
      }
      return makeMiddleware(setup.bind(this));
    };
    function multer2(options) {
      if (options === void 0) {
        return new Multer({});
      }
      if (typeof options === "object" && options !== null) {
        return new Multer(options);
      }
      throw new TypeError("Expected object for argument options");
    }
    module2.exports = multer2;
    module2.exports.diskStorage = diskStorage;
    module2.exports.memoryStorage = memoryStorage;
    module2.exports.MulterError = MulterError;
  }
});

// server/gemini.ts
async function generateWithGemini(model, prompt, context) {
  const systemPrompt = `You are an expert GDScript developer for Godot 4.4. Generate SIMPLE, CLEAN, VALID GDScript code based on user requests.

CRITICAL RULES:
1. MINIMAL comments - only essential explanations, NO block comments
2. Use ONLY standard Godot 4.4 functions (no deprecated methods)
3. Include proper type hints for all function parameters and returns
4. Use @export and @onready annotations correctly

GODOT 4.4 STANDARD FUNCTIONS TO USE:
- Input: Input.is_key_pressed(KEY_W), Input.is_action_pressed("action_name")
- AnimationPlayer: player.play(name, -1, 1.0), player.stop()
- Timer: timer.start(), timer.timeout.connect(func_name)
- Signals: signal_name.emit(), signal_name.connect(func_name)
- Area2D: area_entered.connect(func_name), body_entered.connect(func_name)
- AudioStreamPlayer: audio.play(), audio.stop(), audio.volume_db = -80
- Tween: create_tween().tween_property(node, "position", Vector2(100, 100), 1.0)
- Process: _process(delta), _physics_process(delta), _input(event)
- Node queries: get_node("path"), find_child("name"), get_children()

CODE STYLE:
- Simple, readable variable names
- Logical structure with clear flow
- No unnecessary comments or documentation
- Keep functions focused and short
- Only output pure GDScript code in backticks

${context ? `Context: ${context}` : ""}`;
  try {
    const response = await geminiAi.models.generateContent({
      model: model || "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: systemPrompt },
            { text: `Generate GDScript code for: ${prompt}` }
          ]
        }
      ]
    });
    const text = response.text || "";
    let code = text;
    const codeBlockMatch = text.match(/```(?:gdscript|gd)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      code = codeBlockMatch[1].trim();
    } else {
      code = text.trim();
    }
    code = code.replace(/`/g, "");
    return code;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[Gemini Error] ${errorMsg}`);
    throw error;
  }
}
async function debugCode(gdscriptCode) {
  const prompt = `Analyze this GDScript code for Godot 4.4 and identify issues, warnings, and suggestions.
Return a JSON object with this EXACT structure:
{
  "issues": [
    {"lineNo": 5, "type": "error", "issue": "Missing colon after function definition", "suggestion": "Add ':' after 'func _ready()'"},
    {"lineNo": 10, "type": "warning", "issue": "Unused variable 'player'", "suggestion": "Remove or use the 'player' variable"},
    {"lineNo": 3, "type": "suggestion", "issue": "Consider adding type hints", "suggestion": "Change 'var speed' to 'var speed: float'"}
  ],
  "isValid": false
}

RULES:
- ONLY return JSON, nothing else
- Check for syntax errors, best practices, and Godot 4.4 conventions
- line numbers start from 1
- type can only be: "error", "warning", or "suggestion"
- isValid should be true only if there are NO errors (warnings/suggestions don't make it invalid)
- Focus on common GDScript issues: missing colons, wrong indentation, deprecated functions, type mismatches
- Include line numbers accurately

CODE TO ANALYZE:
${gdscriptCode}`;
  try {
    const response = await geminiAi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    });
    const text = response.text || "{}";
    let parsed = { issues: [], isValid: true };
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      }
    } catch {
      parsed = { issues: [], isValid: true };
    }
    const issues = (parsed.issues || []).filter((issue) => issue.lineNo && issue.type && issue.issue && issue.suggestion).map((issue) => ({
      lineNo: Math.max(1, Math.min(parseInt(issue.lineNo) || 1, gdscriptCode.split("\n").length)),
      type: ["error", "warning", "suggestion"].includes(issue.type) ? issue.type : "suggestion",
      issue: String(issue.issue || "Unknown issue"),
      suggestion: String(issue.suggestion || "No suggestion available")
    }));
    return {
      issues: issues.sort((a, b) => a.lineNo - b.lineNo),
      isValid: parsed.isValid === true && issues.filter((i) => i.type === "error").length === 0
    };
  } catch (error) {
    console.error(`[Gemini Code Analysis Error] ${error instanceof Error ? error.message : String(error)}`);
    return {
      issues: [],
      isValid: false
    };
  }
}
var import_genai, geminiAi, groqApiKey;
var init_gemini = __esm({
  "server/gemini.ts"() {
    "use strict";
    import_genai = require("@google/genai");
    geminiAi = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    groqApiKey = process.env.GROQ_API_KEY || "";
  }
});

// server/groq.ts
async function generateWithGroq(model, prompt, context) {
  const systemPrompt = `You are an expert GDScript developer for Godot 4.4. Generate clean, efficient, and well-commented GDScript code based on user requests.

Rules:
1. Use Godot 4.4 syntax and best practices
2. Include appropriate type hints
3. Use @export and @onready annotations correctly
4. Add brief comments explaining key parts
5. Structure code logically with proper indentation
6. Only output GDScript code, no explanations outside of code comments
7. Use the latest Godot 4.4 API (no deprecated methods)
8. Prefer simple, readable code over complex solutions

${context ? `Context: ${context}` : ""}`;
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Generate GDScript code for: ${prompt}` }
  ];
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model || "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 4e3
    })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${error}`);
  }
  const data = await response.json();
  const text = data.choices[0]?.message?.content || "";
  let code = text;
  const codeBlockMatch = text.match(/```(?:gdscript|gd)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    code = codeBlockMatch[1].trim();
  }
  return code;
}
var init_groq = __esm({
  "server/groq.ts"() {
    "use strict";
  }
});

// server/ai-fallback-enhanced.ts
var ai_fallback_enhanced_exports = {};
__export(ai_fallback_enhanced_exports, {
  generateWithIntelligentFallback: () => generateWithIntelligentFallback
});
async function generateWithIntelligentFallback(prompt, options = {}) {
  const {
    retries = 2,
    timeout = 3e4,
    preferProvider = "gemini"
  } = options;
  const useGemini = process.env.GEMINI_API_KEY?.trim().length > 0;
  const useGroq = process.env.GROQ_API_KEY?.trim().length > 0;
  if (!useGemini && !useGroq) {
    throw new Error("No AI providers configured (Gemini or Groq)");
  }
  if (preferProvider === "gemini" && useGemini) {
    try {
      return await tryGeminiWithRetries(prompt, retries, timeout);
    } catch (geminiError) {
      console.warn("[AI] Gemini failed, attempting Groq fallback:", geminiError);
      if (useGroq) {
        try {
          const result = await tryGroqWithRetries(prompt, retries, timeout);
          result.fallbackUsed = true;
          return result;
        } catch (groqError) {
          throw new Error(`Both Gemini and Groq failed. Gemini: ${geminiError}, Groq: ${groqError}`);
        }
      }
      throw geminiError;
    }
  }
  if (useGroq) {
    try {
      return await tryGroqWithRetries(prompt, retries, timeout);
    } catch (groqError) {
      console.warn("[AI] Groq failed, attempting Gemini fallback:", groqError);
      if (useGemini) {
        try {
          const result = await tryGeminiWithRetries(prompt, retries, timeout);
          result.fallbackUsed = true;
          return result;
        } catch (geminiError) {
          throw new Error(`Both Groq and Gemini failed. Groq: ${groqError}, Gemini: ${geminiError}`);
        }
      }
      throw groqError;
    }
  }
  throw new Error("No AI providers available");
}
async function tryGeminiWithRetries(prompt, maxRetries, timeout) {
  let lastError = null;
  let retryCount = 0;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Gemini] Attempt ${attempt + 1}/${maxRetries + 1}...`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      try {
        const code = await generateWithGemini("gemini-2.0-flash", prompt);
        clearTimeout(timeoutId);
        return {
          code,
          provider: "gemini",
          model: "gemini-2.0-flash",
          retryCount: attempt,
          fallbackUsed: false
        };
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      const errorMsg = lastError.message.toLowerCase();
      const isRateLimit = errorMsg.includes("429") || errorMsg.includes("quota") || errorMsg.includes("rate limit") || errorMsg.includes("resource_exhausted");
      if (!isRateLimit && attempt < maxRetries) {
        throw lastError;
      }
      if (attempt < maxRetries) {
        const delayMs = Math.min(1e3 * Math.pow(2, attempt), 1e4);
        console.log(`[Gemini] Rate limited. Waiting ${delayMs}ms before retry...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        retryCount++;
      }
    }
  }
  throw lastError || new Error("Gemini generation failed after all retries");
}
async function tryGroqWithRetries(prompt, maxRetries, timeout) {
  let lastError = null;
  let retryCount = 0;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Groq] Attempt ${attempt + 1}/${maxRetries + 1}...`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      try {
        const code = await generateWithGroq("llama-3.3-70b-versatile", prompt);
        clearTimeout(timeoutId);
        return {
          code,
          provider: "groq",
          model: "llama-3.3-70b-versatile",
          retryCount: attempt,
          fallbackUsed: false
        };
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      const errorMsg = lastError.message.toLowerCase();
      const isRateLimit = errorMsg.includes("429") || errorMsg.includes("quota") || errorMsg.includes("rate limit") || errorMsg.includes("too many requests");
      if (!isRateLimit && attempt < maxRetries) {
        throw lastError;
      }
      if (attempt < maxRetries) {
        const delayMs = Math.min(1e3 * Math.pow(2, attempt), 1e4);
        console.log(`[Groq] Rate limited. Waiting ${delayMs}ms before retry...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        retryCount++;
      }
    }
  }
  throw lastError || new Error("Groq generation failed after all retries");
}
var init_ai_fallback_enhanced = __esm({
  "server/ai-fallback-enhanced.ts"() {
    "use strict";
    init_gemini();
    init_groq();
  }
});

// server/player-ai-generator.ts
var player_ai_generator_exports = {};
__export(player_ai_generator_exports, {
  generatePlayerScriptWithAI: () => generatePlayerScriptWithAI
});
async function generatePlayerScriptWithAI(request) {
  const prompt = buildPlayerAIPrompt(request);
  try {
    const result = await generateWithIntelligentFallback(prompt, {
      retries: 2,
      timeout: 45e3,
      preferProvider: "gemini"
    });
    console.log(`[Player AI] Generated with ${result.provider}:${result.model}`);
    return {
      code: result.code,
      provider: result.provider,
      model: result.model
    };
  } catch (error) {
    console.error("Player AI generation failed:", error);
    throw new Error(`Failed to generate player script with AI: ${error instanceof Error ? error.message : String(error)}`);
  }
}
function buildPlayerAIPrompt(request) {
  const selectedCount = request.selectedFunctions.length;
  const totalCount = request.totalFunctions;
  const deselectedFuncs = totalCount - selectedCount;
  const variablesText = Object.entries(request.customVariables).map(([name, value]) => `  - ${name} = ${value}`).join("\n");
  const enhancementSection = request.enhancementPrompt ? `
ADDITIONAL REQUIREMENTS FROM USER:
${request.enhancementPrompt}
` : "";
  return `You are a professional Godot 4.4 GDScript developer specializing in script customization.

TASK: Generate a working, executable GDScript by:
1. Removing ${deselectedFuncs} function(s) not in the selection
2. Keeping ${selectedCount} selected functions
3. Applying updated variable values
4. ${request.enhancementPrompt ? "Implementing user enhancements/changes" : "Ensuring NO ERRORS"}
5. The script must be 100% functional in Godot 4.4${request.enhancementPrompt ? " and production-ready" : ""}

SELECTED FUNCTIONS TO KEEP:
${request.selectedFunctions.map((f) => `  - ${f}`).join("\n")}

UPDATED VARIABLES:
${variablesText}
${enhancementSection}
ORIGINAL SCRIPT:
\`\`\`gdscript
${request.fullScript}
\`\`\`

REQUIREMENTS:
1. Keep ALL class variables, exports, and constants (they may be used by functions)
2. Keep the extends declaration and @export_category declarations
3. Remove function bodies that are NOT in the selected functions list
4. Update variable values as specified
5. Ensure all dependencies between kept functions are satisfied
6. Remove any @onready variables or references that are no longer needed
7. ${request.enhancementPrompt ? "Apply user enhancements intelligently without breaking existing code" : 'Keep one-liners like "pass" for removed functions'}
8. Output ONLY valid GDScript code, nothing else

Generate the complete, working GDScript:`;
}
var init_player_ai_generator = __esm({
  "server/player-ai-generator.ts"() {
    "use strict";
    init_ai_fallback_enhanced();
  }
});

// server/flowchart-prompt-builder.ts
var flowchart_prompt_builder_exports = {};
__export(flowchart_prompt_builder_exports, {
  buildFlowchartPrompt: () => buildFlowchartPrompt
});
function buildFlowchartPrompt(nodes, edges) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const edgeMap = /* @__PURE__ */ new Map();
  if (edges) {
    for (const edge of edges) {
      const list = edgeMap.get(edge.source) || [];
      list.push(edge.target);
      edgeMap.set(edge.source, list);
    }
  }
  const startNode = nodes.find((n) => n.type === "start");
  const extendsClass = startNode?.data?.startNodeType || "CharacterBody3D";
  const chainParts = [];
  const visited = /* @__PURE__ */ new Set();
  function traverseNodes(nodeId, depth = 0) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    const node = nodeMap.get(nodeId);
    if (!node) return;
    const indent = "  ".repeat(depth);
    const num = chainParts.length + 1;
    switch (node.type) {
      case "start":
        chainParts.push(`${indent}${num}. START: Class extends ${node.data?.startNodeType || "Node"}`);
        break;
      case "event":
        chainParts.push(`${indent}${num}. EVENT: When user presses "${node.data?.eventParam || "key"}"`);
        break;
      case "movement":
        chainParts.push(`${indent}${num}. MOVEMENT: Move in direction "${node.data?.direction || "X"}" at speed ${node.data?.speed || 5}`);
        break;
      case "animation":
        chainParts.push(`${indent}${num}. ANIMATION: Play animation "${node.data?.animationName || "idle"}" at ${node.data?.animationSpeed || 1}x speed`);
        break;
      case "rotation":
        chainParts.push(`${indent}${num}. ROTATION: Rotate ${node.data?.axis || "x"}-axis by ${node.data?.degrees || 45}\xB0`);
        break;
      case "scale":
        chainParts.push(`${indent}${num}. SCALE: Set scale to ${node.data?.scaleValue || 1}`);
        break;
      case "audio":
        chainParts.push(`${indent}${num}. AUDIO: Play sound "${node.data?.audioClip || "sound"}"`);
        break;
      case "timer":
        chainParts.push(`${indent}${num}. TIMER: Wait ${node.data?.delay || 1} second(s)`);
        break;
      case "condition":
        chainParts.push(`${indent}${num}. CONDITION: If ${node.data?.condition || "true"} then continue`);
        break;
      case "loop":
        chainParts.push(`${indent}${num}. LOOP: ${node.data?.loopType || "for"} loop`);
        break;
      case "variable":
        chainParts.push(`${indent}${num}. VARIABLE: ${node.data?.operation || "set"} ${node.data?.variable_name || "var"}`);
        break;
    }
    const targets = edgeMap.get(nodeId) || [];
    for (const targetId of targets) {
      traverseNodes(targetId, depth + 1);
    }
  }
  if (startNode) {
    traverseNodes(startNode.id);
  }
  return `You are a professional Godot 4.4 GDScript developer. The user has created a visual flowchart diagram that was auto-converted to hardcoded GDScript. Your job is to refine the code to make it production-ready while keeping it simple and following the flowchart sequence exactly.

FLOWCHART SEQUENCE FOR ${extendsClass}:
${chainParts.join("\n")}

REFINEMENT REQUIREMENTS:
1. Code must be 100% working and executable in Godot 4.4
2. Use ONLY official Godot 4.4 API (no custom functions, no templates)
3. Keep code SIMPLE and maintainable - no over-engineering
4. Follow proper lifecycle: _ready() \u2192 _input() \u2192 _physics_process() or _process()
5. Declare ALL variables at top with proper type hints
6. Input handling in _input() only, movement in _physics_process()
7. Use Vector3 for 3D, Vector2 for 2D
8. Add minimal but clear comments
9. Ensure proper null checks
10. Output ONLY the complete, working GDScript class - NO explanations

Follow the flowchart sequence EXACTLY. Generate production-ready code:

FLOWCHART EXECUTION CHAIN:
${chainParts.join("\n")}

CRITICAL CODE STRUCTURE (FOLLOW EXACTLY):
1. USE TABS FOR INDENTATION (not spaces)
2. CLASS VARIABLES AT TOP:
   var move_speed: float = ${movementData.speed || 1}
   var move_direction: Vector3 = Vector3.ZERO
   var velocity: Vector3 = Vector3.ZERO

3. THREE FUNCTIONS ONLY:
   _ready() - initialization
   _input(event) - ONLY FOR INPUT DETECTION
   _physics_process(delta) - ONLY FOR MOVEMENT/ROTATION/ANIMATION

4. FUNCTION PURPOSES (STRICT SEPARATION):
   \u2022 _input(): Set move_direction based on key/action. NO movement, NO animation
   \u2022 _physics_process(): Apply velocity, rotation, animation. NO input detection

5. INPUT LOGIC (in _input only):
   if event is InputEventKey and event.pressed:
   ${eventData.inputType === "key" ? `    if event.keycode == KEY_${(eventData.keyPress || "W").toUpperCase()}:` : `    if Input.is_action_pressed("${eventData.actionName || "ui_accept"}") :`}
         move_direction = Vector3(${movementData.directionX || 0}, ${movementData.directionY || 0}, ${movementData.directionZ || 1})

6. PHYSICS LOGIC (in _physics_process):
   velocity = move_direction * move_speed
   ${movementData.movementNodeType?.includes("CharacterBody") ? "position += velocity * delta  # or use move_and_slide()" : "position += velocity * delta"}
   ${rotationNode ? `rotation += Vector3(${rotationData.rotationX || 0}, ${rotationData.rotationY || 0}, ${rotationData.rotationZ || 0})` : ""}
   if velocity.length() > 0.1:
       $AnimationPlayer.play("${animationData.animationName || "walk"}")
   else:
       $AnimationPlayer.play("idle")

ABSOLUTE REQUIREMENTS:
\u2713 All variables typed: var name: Type = value
\u2713 All functions typed: func name(param: Type) -> ReturnType:
\u2713 Proper indentation with TABS only
\u2713 NO DUPLICATE CODE between functions
\u2713 NO ANIMATION in _input()
\u2713 NO INPUT DETECTION in _physics_process()
\u2713 Animation ONLY plays when velocity > 0.1
\u2713 Use exact animation name: "${animationData.animationName || "walk"}"
\u2713 No hardcoded values - use configuration from nodes
\u2713 Minimal comments - only essential explanations
\u2713 Valid Godot 4.4 syntax only

WHAT NOT TO DO:
\u2717 Don't mix tabs and spaces
\u2717 Don't play animations in _input()
\u2717 Don't detect input in _physics_process()
\u2717 Don't create duplicate animation logic
\u2717 Don't use hardcoded animation names
\u2717 Don't forget type hints

Generate ONLY the complete GDScript class. No explanations. Make it compile and run.`;
}
var init_flowchart_prompt_builder = __esm({
  "server/flowchart-prompt-builder.ts"() {
    "use strict";
  }
});

// server/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_express = __toESM(require("express"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_url2 = require("url");
var import_multer = __toESM(require_multer(), 1);
var import_fs2 = __toESM(require("fs"), 1);

// server/godot-schema.ts
var DEFAULT_NODE_CONFIG = {
  dimension: "2D",
  defaultSpeed: 200,
  vectorType: "Vector2",
  supportsPhysics: false,
  supportsJump: false
};
var DEFAULT_3D_CONFIG = {
  dimension: "3D",
  defaultSpeed: 5,
  vectorType: "Vector3",
  supportsPhysics: false,
  supportsJump: false
};
var CHARACTER_CONTROLLER_CONFIG = {
  nodeTypes: {
    // Physics Bodies - Character Controller (supports physics + jump)
    "CharacterBody2D": {
      dimension: "2D",
      defaultSpeed: 200,
      jumpVelocity: -400,
      gravityPath: "physics/2d/default_gravity",
      gravitySign: "+",
      vectorType: "Vector2",
      supportsPhysics: true,
      supportsJump: true
    },
    "CharacterBody3D": {
      dimension: "3D",
      defaultSpeed: 5,
      jumpVelocity: 4,
      gravityPath: "physics/3d/default_gravity",
      gravitySign: "-",
      vectorType: "Vector3",
      supportsPhysics: true,
      supportsJump: true
    },
    // Physics Bodies - No Jump
    "RigidBody2D": {
      dimension: "2D",
      defaultSpeed: 500,
      vectorType: "Vector2",
      supportsPhysics: true,
      supportsJump: false
    },
    "RigidBody3D": {
      dimension: "3D",
      defaultSpeed: 500,
      vectorType: "Vector3",
      supportsPhysics: true,
      supportsJump: false
    },
    "StaticBody2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "StaticBody3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Areas (Physics-aware but no velocity)
    "Area2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Area3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Base Nodes
    "Node": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Node2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Node3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Sprites
    "Sprite2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Sprite3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "AnimatedSprite2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "AnimatedSprite3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Animation & Audio
    "AnimationPlayer": {
      dimension: "2D",
      defaultSpeed: 1,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "AnimationTree": {
      dimension: "2D",
      defaultSpeed: 1,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "AudioStreamPlayer": {
      dimension: "2D",
      defaultSpeed: 1,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "AudioStreamPlayer2D": {
      dimension: "2D",
      defaultSpeed: 1,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "AudioStreamPlayer3D": {
      dimension: "3D",
      defaultSpeed: 1,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Cameras
    "Camera2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Camera3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Path followers
    "PathFollow2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "PathFollow3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Path nodes
    "Path2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Path3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Physics shapes
    "CollisionShape2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "CollisionShape3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // UI
    "Control": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Button": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Label": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Panel": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    // Containers
    "VBoxContainer": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "HBoxContainer": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "GridContainer": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    // Lights & Meshes
    "MeshInstance3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "Light3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "DirectionalLight3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "OmniLight3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "SpotLight3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Markers
    "Marker2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Marker3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Particles
    "CPUParticles2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "CPUParticles3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "GPUParticles2D": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "GPUParticles3D": {
      dimension: "3D",
      defaultSpeed: 5,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    // Timer
    "Timer": {
      dimension: "2D",
      defaultSpeed: 1,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    // Canvas & Viewport
    "CanvasLayer": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "CanvasGroup": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Viewport": {
      dimension: "2D",
      defaultSpeed: 200,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    // Tween
    "Tween": {
      dimension: "2D",
      defaultSpeed: 1,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    }
  },
  // Direction mappings for 2D and 3D
  // Format: direction => { inputDir: axis to modify, operator: += or -=, value: 1.0 }
  // 2D: X=right, Y=down, -X=left, -Y=up
  // 3D: X=right, Y=up, Z=forward, -X=left, -Y=down, -Z=backward
  directionMappings: {
    "2D": {
      "X": { inputDir: "x", operator: "-=", value: 1, label: "Right" },
      "Y": { inputDir: "y", operator: "+=", value: 1, label: "Down" },
      "-X": { inputDir: "x", operator: "+=", value: 1, label: "Left" },
      "-Y": { inputDir: "y", operator: "-=", value: 1, label: "Up" }
    },
    "3D": {
      "X": { inputDir: "x", operator: "-=", value: 1, label: "Right" },
      "Y": { inputDir: "y", operator: "+=", value: 1, label: "Up" },
      "Z": { inputDir: "z", operator: "-=", value: 1, label: "Forward" },
      "-X": { inputDir: "x", operator: "+=", value: 1, label: "Left" },
      "-Y": { inputDir: "y", operator: "-=", value: 1, label: "Down" },
      "-Z": { inputDir: "z", operator: "+=", value: 1, label: "Backward" }
    }
  },
  // All supported keyboard keys for event configuration
  allKeyboardKeys: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Space",
    "Enter",
    "Tab",
    "Escape",
    "Backspace",
    "Delete",
    "Up",
    "Down",
    "Left",
    "Right",
    "Home",
    "End",
    "Page Up",
    "Page Down",
    "Shift",
    "Control",
    "Alt",
    "Meta",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "Plus",
    "Minus",
    "Equal",
    "Slash",
    "Backslash",
    "Comma",
    "Period",
    "Semicolon",
    "Apostrophe",
    "Bracket Left",
    "Bracket Right",
    "Grave"
  ],
  // Key mapping from UI labels to Godot KEY_* constants
  keyCodeMap: {
    "A": "KEY_A",
    "B": "KEY_B",
    "C": "KEY_C",
    "D": "KEY_D",
    "E": "KEY_E",
    "F": "KEY_F",
    "G": "KEY_G",
    "H": "KEY_H",
    "I": "KEY_I",
    "J": "KEY_J",
    "K": "KEY_K",
    "L": "KEY_L",
    "M": "KEY_M",
    "N": "KEY_N",
    "O": "KEY_O",
    "P": "KEY_P",
    "Q": "KEY_Q",
    "R": "KEY_R",
    "S": "KEY_S",
    "T": "KEY_T",
    "U": "KEY_U",
    "V": "KEY_V",
    "W": "KEY_W",
    "X": "KEY_X",
    "Y": "KEY_Y",
    "Z": "KEY_Z",
    "0": "KEY_0",
    "1": "KEY_1",
    "2": "KEY_2",
    "3": "KEY_3",
    "4": "KEY_4",
    "5": "KEY_5",
    "6": "KEY_6",
    "7": "KEY_7",
    "8": "KEY_8",
    "9": "KEY_9",
    "Space": "KEY_SPACE",
    "Enter": "KEY_ENTER",
    "Tab": "KEY_TAB",
    "Escape": "KEY_ESCAPE",
    "Backspace": "KEY_BACKSPACE",
    "Delete": "KEY_DELETE",
    "Up": "KEY_UP",
    "Down": "KEY_DOWN",
    "Left": "KEY_LEFT",
    "Right": "KEY_RIGHT",
    "Home": "KEY_HOME",
    "End": "KEY_END",
    "Page Up": "KEY_PAGEUP",
    "Page Down": "KEY_PAGEDOWN",
    "Shift": "KEY_SHIFT",
    "Control": "KEY_CTRL",
    "Alt": "KEY_ALT",
    "Meta": "KEY_META",
    "F1": "KEY_F1",
    "F2": "KEY_F2",
    "F3": "KEY_F3",
    "F4": "KEY_F4",
    "F5": "KEY_F5",
    "F6": "KEY_F6",
    "F7": "KEY_F7",
    "F8": "KEY_F8",
    "F9": "KEY_F9",
    "F10": "KEY_F10",
    "F11": "KEY_F11",
    "F12": "KEY_F12",
    "Plus": "KEY_PLUS",
    "Minus": "KEY_MINUS",
    "Equal": "KEY_EQUAL",
    "Slash": "KEY_SLASH",
    "Backslash": "KEY_BACKSLASH",
    "Comma": "KEY_COMMA",
    "Period": "KEY_PERIOD",
    "Semicolon": "KEY_SEMICOLON",
    "Apostrophe": "KEY_APOSTROPHE",
    "Bracket Left": "KEY_BRACKETLEFT",
    "Bracket Right": "KEY_BRACKETRIGHT",
    "Grave": "KEY_GRAVE"
  },
  runToggleKey: "SHIFT",
  runSpeedMultiplier: 2,
  jumpKey: "SPACE"
};
function getNodeConfig(nodeType) {
  const config = CHARACTER_CONTROLLER_CONFIG.nodeTypes[nodeType];
  if (config) return config;
  if (nodeType.includes("3D")) {
    return DEFAULT_3D_CONFIG;
  }
  if (nodeType.includes("2D") || nodeType.includes("Body") || nodeType.includes("Area")) {
    return DEFAULT_NODE_CONFIG;
  }
  return DEFAULT_NODE_CONFIG;
}

// server/rotation-schema.ts
var ROTATION_NODE_SCHEMA = {
  rotationNodeTypes: {
    "rotate_continuous": {
      category: "transform",
      description: "Continuous rotation over time",
      parameters: {
        axis: ["x", "y", "z", "all"],
        speed: { type: "float", default: 1, min: 0, max: 10 },
        direction: ["clockwise", "counterclockwise", "pingpong"],
        space: ["local", "global"],
        condition: { type: "string", default: "true" }
      }
    },
    "rotate_to_target": {
      category: "transform",
      description: "Rotate towards a target point or object",
      parameters: {
        target_type: ["position", "node", "mouse", "player"],
        target_path: { type: "string", default: "" },
        speed: { type: "float", default: 2, min: 0, max: 10 },
        axis_lock: ["none", "x", "y", "z"],
        smoothing: { type: "bool", default: true }
      }
    },
    "rotate_on_input": {
      category: "input",
      description: "Rotate based on keyboard/mouse/gamepad input",
      parameters: {
        input_type: ["keyboard", "mouse", "gamepad"],
        axis: ["x", "y", "z"],
        sensitivity: { type: "float", default: 1, min: 0.1, max: 5 },
        invert: { type: "bool", default: false },
        clamp: { type: "bool", default: false },
        min_angle: { type: "float", default: -180 },
        max_angle: { type: "float", default: 180 }
      }
    },
    "rotate_between_angles": {
      category: "animation",
      description: "Rotate between min/max angles with easing",
      parameters: {
        min_angle: { type: "float", default: -45 },
        max_angle: { type: "float", default: 45 },
        duration: { type: "float", default: 1 },
        easing: ["linear", "ease_in", "ease_out", "ease_in_out"],
        loop: ["none", "cycle", "pingpong"],
        auto_start: { type: "bool", default: true }
      }
    },
    "rotate_snap": {
      category: "transform",
      description: "Snap rotation to specific angles",
      parameters: {
        snap_angle: { type: "float", default: 45 },
        smooth: { type: "bool", default: false },
        smooth_speed: { type: "float", default: 5 },
        axis: ["x", "y", "z", "all"]
      }
    },
    "rotate_shake": {
      category: "effect",
      description: "Screen/camera shake rotation effect",
      parameters: {
        intensity: { type: "float", default: 0.5 },
        duration: { type: "float", default: 0.5 },
        frequency: { type: "float", default: 15 },
        decay: ["none", "linear", "exponential"],
        axis: ["x", "y", "z", "all"]
      }
    },
    "rotate_physics": {
      category: "physics",
      description: "Physics-based rotation (torque/angular velocity)",
      parameters: {
        method: ["torque", "angular_velocity", "impulse"],
        force: { type: "float", default: 100 },
        axis: ["x", "y", "z"],
        local: { type: "bool", default: true },
        damping: { type: "float", default: 0.1 }
      }
    }
  },
  rotationInputs: {
    keyboard_pairs: {
      rotate_left_right: { negative: "A", positive: "D" },
      rotate_up_down: { negative: "S", positive: "W" },
      rotate_roll: { negative: "Q", positive: "E" }
    }
  },
  easingFunctions: {
    linear: "Tween.TRANS_LINEAR",
    sine: "Tween.TRANS_SINE",
    quad: "Tween.TRANS_QUAD",
    cubic: "Tween.TRANS_CUBIC",
    back: "Tween.TRANS_BACK",
    bounce: "Tween.TRANS_BOUNCE"
  },
  rotationConstants: {
    common_angles: {
      "0": 0,
      "45": 45,
      "90": 90,
      "180": 180,
      "270": 270,
      "360": 360
    },
    direction_multipliers: {
      clockwise: -1,
      counterclockwise: 1,
      pingpong: 0.5
    }
  }
};

// server/rotation-generator.ts
var RotationNodeGenerator = class {
  generateRotationCode(node, dimension = "3D", nodeType = "Node3D") {
    const rotationType = node.data?.rotationType || "rotate_continuous";
    let code = "";
    const indent = "	";
    code += `
${indent}# Rotation: ${rotationType}
`;
    switch (rotationType) {
      case "rotate_continuous":
        code += this.generateContinuousRotation(node, dimension, indent);
        break;
      case "rotate_to_target":
        code += this.generateRotateToTarget(node, dimension, indent);
        break;
      case "rotate_on_input":
        code += this.generateInputRotation(node, dimension, indent);
        break;
      case "rotate_between_angles":
        code += this.generateAngleRotation(node, dimension, indent);
        break;
      case "rotate_snap":
        code += this.generateSnapRotation(node, dimension, indent);
        break;
      case "rotate_shake":
        code += this.generateShakeRotation(node, dimension, indent);
        break;
      case "rotate_physics":
        code += this.generatePhysicsRotation(node, nodeType, indent);
        break;
      default:
        code += `${indent}# Unknown rotation type
`;
    }
    return code;
  }
  generateContinuousRotation(node, dimension, indent) {
    const axis = node.data?.rotationAxis || "y";
    const speed = node.data?.rotationSpeed || 1;
    const direction = node.data?.rotationDirection || "counterclockwise";
    const space = node.data?.rotationSpace || "local";
    const dirMultiplier = ROTATION_NODE_SCHEMA.rotationConstants.direction_multipliers[direction] || 1;
    if (dimension === "2D") {
      if (space === "local") {
        return `${indent}rotation += deg_to_rad(${speed} * ${dirMultiplier}) * delta
`;
      } else {
        return `${indent}global_rotation += deg_to_rad(${speed} * ${dirMultiplier}) * delta
`;
      }
    } else {
      if (space === "local") {
        return `${indent}rotate_${axis}(deg_to_rad(${speed} * ${dirMultiplier} * delta))
`;
      } else {
        return `${indent}global_rotate(Vector3.${axis.toUpperCase()}, deg_to_rad(${speed} * ${dirMultiplier} * delta))
`;
      }
    }
  }
  generateRotateToTarget(node, dimension, indent) {
    const targetType = node.data?.rotationTargetType || "position";
    const speed = node.data?.rotationSpeed || 2;
    const smooth = node.data?.rotationSmoothing !== false;
    if (targetType === "player") {
      if (dimension === "2D") {
        return `${indent}look_at(get_tree().get_first_node_in_group("player").global_position)
`;
      } else {
        return `${indent}look_at(get_tree().get_first_node_in_group("player").global_position)
`;
      }
    } else if (targetType === "mouse") {
      if (dimension === "2D") {
        return `${indent}look_at(get_global_mouse_position())
`;
      } else {
        return `${indent}look_at(get_global_mouse_position())
`;
      }
    }
    if (smooth) {
      return `${indent}rotation.y = lerp_angle(rotation.y, 0, ${speed} * delta)
`;
    } else {
      return `${indent}rotation.y += ${speed} * delta
`;
    }
  }
  generateInputRotation(node, dimension, indent) {
    const inputType = node.data?.rotationInputType || "mouse";
    const axis = node.data?.rotationAxis || "y";
    const sensitivity = node.data?.rotationSensitivity || 1;
    const invert = node.data?.rotationInvert ? "-" : "";
    if (inputType === "keyboard") {
      return `${indent}rotation.${axis} += Input.get_axis("A", "D") * deg_to_rad(${sensitivity}) * ${invert}1.0 * delta
`;
    } else if (inputType === "mouse") {
      return `${indent}# Mouse input rotation
if Input.is_action_pressed("ui_focus_next"):
${indent}	rotation.${axis} += Input.get_relative().y * deg_to_rad(${sensitivity}) * ${invert}0.001 * delta
`;
    } else {
      return `${indent}rotation.${axis} += Input.get_joy_axis(0, JOY_AXIS_RIGHT_X) * deg_to_rad(${sensitivity}) * ${invert}1.0 * delta
`;
    }
  }
  generateAngleRotation(node, dimension, indent) {
    const minAngle = node.data?.rotationMinAngle || -45;
    const maxAngle = node.data?.rotationMaxAngle || 45;
    const duration = node.data?.rotationDuration || 1;
    const easing = node.data?.rotationEasing || "linear";
    const easingValue = ROTATION_NODE_SCHEMA.easingFunctions[easing] || "Tween.TRANS_LINEAR";
    return `${indent}var tween = create_tween()
${indent}tween.set_trans(${easingValue})
${indent}tween.tween_property(self, "rotation:y", deg_to_rad(${maxAngle}), ${duration})
`;
  }
  generateSnapRotation(node, dimension, indent) {
    const snapAngle = node.data?.rotationSnapAngle || 45;
    const axis = node.data?.rotationAxis || "y";
    const smooth = node.data?.rotationSmooth || false;
    const smoothSpeed = node.data?.rotationSmoothSpeed || 5;
    if (dimension === "2D") {
      if (smooth) {
        return `${indent}rotation = lerp_angle(rotation, round(rotation / deg_to_rad(${snapAngle})) * deg_to_rad(${snapAngle}), ${smoothSpeed} * delta)
`;
      } else {
        return `${indent}rotation = round(rotation / deg_to_rad(${snapAngle})) * deg_to_rad(${snapAngle})
`;
      }
    } else {
      return `${indent}rotation.${axis} = round(rotation.${axis} / deg_to_rad(${snapAngle})) * deg_to_rad(${snapAngle})
`;
    }
  }
  generateShakeRotation(node, dimension, indent) {
    const intensity = node.data?.rotationIntensity || 0.5;
    const duration = node.data?.rotationDuration || 0.5;
    const axis = node.data?.rotationAxis || "y";
    return `${indent}# Shake rotation
var original_rot = rotation.${axis}
var elapsed = 0.0
while elapsed < ${duration}:
${indent}	rotation.${axis} = original_rot + randf_range(-${intensity}, ${intensity})
${indent}	elapsed += get_physics_process_delta_time()
${indent}	yield(get_tree(), "physics_frame")
${indent}rotation.${axis} = original_rot
`;
  }
  generatePhysicsRotation(node, nodeType, indent) {
    const method = node.data?.rotationPhysicsMethod || "torque";
    const force = node.data?.rotationForce || 100;
    const axis = node.data?.rotationAxis || "y";
    if (nodeType.includes("3D")) {
      if (method === "torque") {
        return `${indent}apply_torque(Vector3.${axis.toUpperCase()} * ${force})
`;
      } else if (method === "angular_velocity") {
        return `${indent}angular_velocity = Vector3.${axis.toUpperCase()} * ${force}
`;
      }
    } else {
      if (method === "torque") {
        return `${indent}apply_torque(${force})
`;
      } else if (method === "angular_velocity") {
        return `${indent}angular_velocity = ${force}
`;
      }
    }
    return `${indent}# Physics rotation
`;
  }
};

// server/advanced-nodes-generator.ts
var AdvancedNodesGenerator = class {
  generateAdvancedNodeCode(node, dimension = "3D", nodeType = "Node3D") {
    const nodeCategory = node.type?.split("_")[0];
    let code = "";
    const indent = "	";
    switch (nodeCategory) {
      case "scale":
        code += this.generateScaleCode(node, dimension, indent);
        break;
      case "camera":
        code += this.generateCameraCode(node, dimension, indent);
        break;
      case "audio":
        code += this.generateAudioCode(node, indent);
        break;
      case "if":
      case "compare":
      case "range":
      case "distance":
        code += this.generateConditionCode(node, indent);
        break;
      case "emit":
      case "connect":
      case "area":
        code += this.generateSignalCode(node, indent);
        break;
      case "tween":
        code += this.generateTweenCode(node, indent);
        break;
      case "start":
      case "stop":
      case "wait":
      case "cooldown":
        code += this.generateTimerCode(node, indent);
        break;
      default:
        code += `${indent}# Unknown node type: ${node.type}
`;
    }
    return code;
  }
  generateScaleCode(node, dimension, indent) {
    const nodeType = node.type;
    let code = `
${indent}# Scale: ${nodeType}
`;
    if (nodeType === "scale_continuous") {
      const axis = node.data?.scaleAxis || "uniform";
      const speed = node.data?.scaleSpeed || 0.5;
      const direction = node.data?.scaleDirection || "grow";
      if (direction === "grow") {
        if (dimension === "2D") {
          code += `${indent}scale += Vector2(${speed}, ${speed}) * delta
`;
        } else {
          code += `${indent}scale += Vector3(${speed}, ${speed}, ${speed}) * delta
`;
        }
      } else if (direction === "shrink") {
        if (dimension === "2D") {
          code += `${indent}scale -= Vector2(${speed}, ${speed}) * delta
`;
        } else {
          code += `${indent}scale -= Vector3(${speed}, ${speed}, ${speed}) * delta
`;
        }
      } else if (direction === "pulse") {
        code += `${indent}scale = Vector3.ONE * (1.0 + sin(Time.get_ticks_msec() / 1000.0) * 0.2)
`;
      }
    } else if (nodeType === "scale_to_target") {
      const targetScale = node.data?.scaleTargetScale || "Vector3(2,2,2)";
      const speed = node.data?.scaleSpeed || 2;
      code += `${indent}scale = scale.lerp(${targetScale}, ${speed} * delta)
`;
    } else if (nodeType === "scale_on_collision") {
      const multiplier = node.data?.scaleMultiplier || 1.2;
      const duration = node.data?.scaleDuration || 0.3;
      code += `${indent}# Bounce on collision
var original_scale = scale
scale = original_scale * ${multiplier}
await get_tree().create_timer(${duration}).timeout
scale = original_scale
`;
    }
    return code;
  }
  generateCameraCode(node, dimension, indent) {
    const nodeType = node.type;
    let code = `
${indent}# Camera: ${nodeType}
`;
    if (nodeType === "camera_follow") {
      const target = node.data?.cameraTarget || "$Player";
      const offset = node.data?.cameraOffset || "Vector3(0, 2, 5)";
      const smoothSpeed = node.data?.cameraSmoothSpeed || 5;
      code += `${indent}global_position = global_position.lerp(${target}.global_position + ${offset}, ${smoothSpeed} * delta)
`;
      code += `${indent}look_at(${target}.global_position)
`;
    } else if (nodeType === "camera_shake") {
      const intensity = node.data?.cameraIntensity || 0.5;
      const duration = node.data?.cameraDuration || 0.5;
      code += `${indent}# Camera shake
var original_pos = position
var elapsed = 0.0
while elapsed < ${duration}:
${indent}	position = original_pos + Vector3(randf_range(-${intensity}, ${intensity}), randf_range(-${intensity}, ${intensity}), 0)
${indent}	elapsed += get_physics_process_delta_time()
${indent}	yield(get_tree(), "physics_frame")
${indent}position = original_pos
`;
    } else if (nodeType === "camera_zoom") {
      const zoomLevel = node.data?.cameraZoomLevel || 0.5;
      code += `${indent}fov = lerp(fov, 75.0 * ${zoomLevel}, 5.0 * delta)
`;
    }
    return code;
  }
  generateAudioCode(node, indent) {
    const nodeType = node.type;
    let code = `
${indent}# Audio: ${nodeType}
`;
    if (nodeType === "play_sound") {
      const audioFile = node.data?.audioFile || "res://sounds/effect.wav";
      const volume = node.data?.audioVolume || 0;
      const pitch = node.data?.audioPitch || 1;
      code += `${indent}@onready var audio_player = $AudioStreamPlayer
${indent}audio_player.stream = load("${audioFile}")
${indent}audio_player.volume_db = ${volume}
${indent}audio_player.pitch_scale = ${pitch}
${indent}audio_player.play()
`;
    } else if (nodeType === "stop_sound") {
      const fadeOut = node.data?.audioFadeOut || false;
      if (fadeOut) {
        const fadeDuration = node.data?.audioFadeDuration || 1;
        code += `${indent}create_tween().tween_property(audio_player, "volume_db", -80, ${fadeDuration})
${indent}await get_tree().create_timer(${fadeDuration}).timeout
${indent}audio_player.stop()
`;
      } else {
        code += `${indent}audio_player.stop()
`;
      }
    } else if (nodeType === "spatial_audio") {
      const maxDistance = node.data?.audioMaxDistance || 50;
      code += `${indent}@onready var audio_3d = $AudioStreamPlayer3D
${indent}audio_3d.max_distance = ${maxDistance}
`;
    }
    return code;
  }
  generateConditionCode(node, indent) {
    const nodeType = node.type;
    let code = `
${indent}# Condition: ${nodeType}
`;
    if (nodeType === "if_condition") {
      const condition = node.data?.conditionExpression || "true";
      code += `${indent}if ${condition}:
${indent}	pass
${indent}else:
${indent}	pass
`;
    } else if (nodeType === "compare_variables") {
      const varA = node.data?.compareVarA || "health";
      const operator = node.data?.compareOperator || ">";
      const varB = node.data?.compareVarB || "0";
      code += `${indent}if ${varA} ${operator} ${varB}:
${indent}	pass
`;
    } else if (nodeType === "range_check") {
      const variable = node.data?.rangeVariable || "health";
      const minValue = node.data?.rangeMin || 0;
      const maxValue = node.data?.rangeMax || 100;
      code += `${indent}if ${variable} >= ${minValue} and ${variable} <= ${maxValue}:
${indent}	pass
`;
    } else if (nodeType === "distance_check") {
      const objA = node.data?.distanceObjectA || "$Player";
      const objB = node.data?.distanceObjectB || "$Enemy";
      const maxDist = node.data?.distanceMax || 10;
      code += `${indent}if ${objA}.global_position.distance_to(${objB}.global_position) < ${maxDist}:
${indent}	pass
`;
    }
    return code;
  }
  generateSignalCode(node, indent) {
    const nodeType = node.type;
    let code = `
${indent}# Signal: ${nodeType}
`;
    if (nodeType === "emit_signal") {
      const signalName = node.data?.signalName || "signal_name";
      code += `${indent}emit_signal("${signalName}")
`;
    } else if (nodeType === "connect_signal") {
      const sourceNode = node.data?.signalSource || "$Button";
      const signalName = node.data?.signalName || "pressed";
      const targetFunc = node.data?.signalTarget || "_on_button_pressed";
      code += `${indent}${sourceNode}.${signalName}.connect(${targetFunc})
`;
    } else if (nodeType === "area_signal") {
      const signalType = node.data?.areaSignalType || "body_entered";
      code += `${indent}func _on_area_${signalType}(body: Node) -> void:
${indent}	pass
`;
    }
    return code;
  }
  generateTweenCode(node, indent) {
    const nodeType = node.type;
    let code = `
${indent}# Tween: ${nodeType}
`;
    if (nodeType === "tween_property") {
      const property = node.data?.tweenProperty || "position";
      const targetValue = node.data?.tweenTargetValue || "Vector3(0, 10, 0)";
      const duration = node.data?.tweenDuration || 1;
      code += `${indent}var tween = create_tween()
${indent}tween.tween_property(self, "${property}", ${targetValue}, ${duration})
`;
    } else if (nodeType === "tween_callback") {
      const funcName = node.data?.tweenCallback || "_on_tween_finished";
      code += `${indent}tween.tween_callback(${funcName})
`;
    }
    return code;
  }
  generateTimerCode(node, indent) {
    const nodeType = node.type;
    let code = `
${indent}# Timer: ${nodeType}
`;
    if (nodeType === "start_timer") {
      const timerName = node.data?.timerName || "Timer";
      const waitTime = node.data?.timerWaitTime || 1;
      code += `${indent}@onready var timer = $${timerName}
${indent}timer.start(${waitTime})
`;
    } else if (nodeType === "stop_timer") {
      const timerName = node.data?.timerName || "Timer";
      code += `${indent}timer.stop()
`;
    } else if (nodeType === "wait_timer") {
      const waitTime = node.data?.timerWaitTime || 1;
      code += `${indent}await get_tree().create_timer(${waitTime}).timeout
`;
    } else if (nodeType === "cooldown_timer") {
      const cooldownTime = node.data?.cooldownTime || 1;
      const readyVar = node.data?.cooldownVariable || "can_attack";
      code += `${indent}if ${readyVar}:
${indent}	${readyVar} = false
${indent}	await get_tree().create_timer(${cooldownTime}).timeout
${indent}	${readyVar} = true
`;
    }
    return code;
  }
};

// server/flowchart-generator.ts
async function generateGDScriptFromFlowchart(nodes, edges) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const edgeMap = /* @__PURE__ */ new Map();
  for (const edge of edges) {
    const list = edgeMap.get(edge.source) || [];
    list.push(edge.target);
    edgeMap.set(edge.source, list);
  }
  const startNode = nodes.find((n) => n.type === "start");
  if (!startNode) return `extends Node

func _ready() -> void:
	pass
`;
  const extendsClass = startNode.data?.startNodeType || "Node";
  const config = getNodeConfig(extendsClass);
  if (!config) {
    return `extends ${extendsClass}

func _ready() -> void:
	pass
`;
  }
  const eventNodes = nodes.filter((n) => n.type === "event");
  const hasEvents = eventNodes.length > 0;
  const eventChains = [];
  if (hasEvents) {
    for (const eventNode of eventNodes) {
      const eventKey = eventNode.data?.eventParam;
      if (!eventKey) continue;
      const keyCode = CHARACTER_CONTROLLER_CONFIG.keyCodeMap[eventKey] || `KEY_${eventKey}`;
      const eventData2 = {
        key: eventKey,
        keyCode
      };
      const targets = edgeMap.get(eventNode.id) || [];
      const movementNode = targets.map((id) => nodeMap.get(id)).find((n) => n?.type === "movement");
      if (movementNode) {
        eventData2.direction = movementNode.data?.direction;
        eventData2.speed = parseFloat(movementNode.data?.speed || "1");
        const animTargets = edgeMap.get(movementNode.id) || [];
        const animNode = animTargets.map((id) => nodeMap.get(id)).find((n) => n?.type === "animation");
        if (animNode) {
          eventData2.animationName = animNode.data?.animationName;
          eventData2.animationSpeed = parseFloat(animNode.data?.animationSpeed || "1.0");
          eventData2.animationBackward = animNode.data?.animationBackward || false;
        }
      }
      eventChains.push(eventData2);
    }
  }
  const hasAnimations = eventChains.some((e) => e.animationName);
  const hasMovements = eventChains.some((e) => e.direction);
  const otherNodes = nodes.filter((n) => !["start", "event", "movement", "animation"].includes(n.type));
  if (hasAnimations) {
    let code = generateCharacterControllerWithAnimations(extendsClass, config, eventChains);
    code += generateOtherNodeCode(otherNodes, nodeMap, edgeMap);
    return code;
  } else if (hasMovements) {
    let code = generateCharacterControllerBasic(extendsClass, config, eventChains);
    code += generateOtherNodeCode(otherNodes, nodeMap, edgeMap);
    return code;
  } else if (eventChains.length > 0) {
    let code = generateEventOnlyController(extendsClass, config, eventChains);
    code += generateOtherNodeCode(otherNodes, nodeMap, edgeMap);
    return code;
  } else if (otherNodes.length > 0) {
    let code = `extends ${extendsClass}

`;
    code += `func _ready() -> void:
	pass

`;
    code += generateOtherNodeCode(otherNodes, nodeMap, edgeMap);
    return code;
  } else {
    return `extends ${extendsClass}

func _ready() -> void:
	pass
`;
  }
}
function generateOtherNodeCode(nodes, nodeMap, edgeMap) {
  let code = "";
  const nodesByType = /* @__PURE__ */ new Map();
  for (const node of nodes) {
    const list = nodesByType.get(node.type) || [];
    list.push(node);
    nodesByType.set(node.type, list);
  }
  const printNodes = nodesByType.get("print") || [];
  if (printNodes.length > 0) {
    for (const node of printNodes) {
      const text = node.data?.printText || "Debug message";
      code += `
# Print: ${text}
print("${text}")
`;
    }
  }
  const rotationNodes = nodesByType.get("rotation") || [];
  if (rotationNodes.length > 0) {
    const rotGen = new RotationNodeGenerator();
    for (const node of rotationNodes) {
      const startNode2 = nodes.find((n) => n.type === "start");
      const extendsClass2 = startNode2?.data?.startNodeType || "Node3D";
      const dimension2 = extendsClass2.includes("3D") ? "3D" : "2D";
      code += rotGen.generateRotationCode(node, dimension2, extendsClass2);
    }
  }
  const advancedNodeGen = new AdvancedNodesGenerator();
  const startNode = nodes.find((n) => n.type === "start");
  const extendsClass = startNode?.data?.startNodeType || "Node3D";
  const dimension = extendsClass.includes("3D") ? "3D" : "2D";
  const scaleNodes = nodesByType.get("scale") || [];
  if (scaleNodes.length > 0) {
    for (const node of scaleNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }
  const cameraNodes = nodesByType.get("camera") || [];
  if (cameraNodes.length > 0) {
    for (const node of cameraNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }
  const audioNodes = nodesByType.get("audio") || [];
  if (audioNodes.length > 0) {
    for (const node of audioNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }
  const conditionNodes = nodesByType.get("if") || [];
  const compareNodes = nodesByType.get("compare") || [];
  const rangeNodes = nodesByType.get("range") || [];
  const distanceNodes = nodesByType.get("distance") || [];
  const allConditions = [...conditionNodes, ...compareNodes, ...rangeNodes, ...distanceNodes];
  if (allConditions.length > 0) {
    for (const node of allConditions) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }
  const signalNodes = nodesByType.get("signal") || [];
  if (signalNodes.length > 0) {
    for (const node of signalNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }
  const tweenNodes = nodesByType.get("tween") || [];
  if (tweenNodes.length > 0) {
    for (const node of tweenNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }
  const timerNodes = nodesByType.get("timer") || [];
  if (timerNodes.length > 0) {
    for (const node of timerNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }
  const spawnNodes = nodesByType.get("spawn") || [];
  if (spawnNodes.length > 0) {
    for (const node of spawnNodes) {
      const scenePath = node.data?.spawnScenePath || "res://scenes/spawned.tscn";
      code += `
# Spawn node
var spawned = load("${scenePath}").instantiate()
add_child(spawned)
spawned.global_position = global_position
`;
    }
  }
  const destroyNodes = nodesByType.get("destroy") || [];
  if (destroyNodes.length > 0) {
    for (const node of destroyNodes) {
      const delay = node.data?.destroyDelay || 0;
      if (delay > 0) {
        code += `
# Destroy after ${delay}s
await get_tree().create_timer(${delay}).timeout
queue_free()
`;
      } else {
        code += `
# Destroy node
queue_free()
`;
      }
    }
  }
  const variableNodes = nodesByType.get("variable") || [];
  if (variableNodes.length > 0) {
    for (const node of variableNodes) {
      const varName = node.data?.variableName || "var_" + Math.random().toString(36).substr(2, 9);
      const varValue = node.data?.variableValue || "0";
      const varType = node.data?.variableType || "float";
      code += `
# Variable: ${varName}
var ${varName}: ${varType} = ${varValue}
`;
    }
  }
  const propertyNodes = nodesByType.get("property") || [];
  if (propertyNodes.length > 0) {
    for (const node of propertyNodes) {
      const propName = node.data?.propertyName || "position";
      const propValue = node.data?.propertyValue || "Vector3.ZERO";
      code += `
# Set property: ${propName}
${propName} = ${propValue}
`;
    }
  }
  const sceneNodes = nodesByType.get("scene") || [];
  if (sceneNodes.length > 0) {
    for (const node of sceneNodes) {
      const scenePath = node.data?.scenePath || "res://scenes/main.tscn";
      code += `
# Change scene
get_tree().change_scene_to_file("${scenePath}")
`;
    }
  }
  const collisionNodes = nodesByType.get("collision") || [];
  if (collisionNodes.length > 0) {
    for (const node of collisionNodes) {
      code += `
# Collision detection
func _on_body_entered(body):
	print("Collided with: ", body.name)
`;
    }
  }
  const codeNodes = nodesByType.get("code") || [];
  if (codeNodes.length > 0) {
    for (const node of codeNodes) {
      const customCode = node.data?.customCode || "# Custom code";
      code += `
# Custom Code
${customCode}
`;
    }
  }
  return code;
}
function generateEventOnlyController(extendsClass, config, eventChains) {
  let code = `extends ${extendsClass}

`;
  code += `func _ready() -> void:
	pass

`;
  code += `func _physics_process(delta: float) -> void:
`;
  for (let i = 0; i < eventChains.length; i++) {
    const event = eventChains[i];
    code += `	# Event ${i + 1}: ${event.key}
`;
    code += `	if Input.is_key_pressed(${event.keyCode}):
`;
    code += `		pass
`;
  }
  return code;
}
function generateCharacterControllerBasic(extendsClass, config, eventChains) {
  let code = `extends ${extendsClass}

`;
  code += `# Movement Variables
`;
  const speedVal = Number.isInteger(config.defaultSpeed) ? config.defaultSpeed : config.defaultSpeed.toFixed(1);
  code += `var speed: float = ${speedVal}
`;
  if (config.supportsJump) {
    const jumpVal = Number.isInteger(config.jumpVelocity) ? config.jumpVelocity : config.jumpVelocity.toFixed(1);
    code += `var jump_velocity: float = ${jumpVal}
`;
    code += `var gravity = ProjectSettings.get_setting("${config.gravityPath}")
`;
  }
  code += `var is_running: bool = false

`;
  code += `func _ready() -> void:
	pass

`;
  code += `func _physics_process(delta: float) -> void:
`;
  if (config.supportsJump) {
    code += `	# Apply gravity
`;
    code += `	if not is_on_floor():
`;
    code += `		velocity.y ${config.gravitySign}= gravity * delta
	
`;
    code += `	# Handle jump
`;
    code += `	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
`;
    code += `		velocity.y = jump_velocity
	
`;
  }
  code += `	# Toggle run mode
`;
  code += `	if Input.is_action_just_pressed("ui_shift"):
`;
  code += `		is_running = !is_running
	
`;
  code += `	# Calculate speed multiplier
`;
  code += `	var speed_multiplier = 2.0 if is_running else 1.0
	
`;
  code += `	# Get input direction
`;
  const vectorType = config.vectorType;
  code += `	var input_dir = ${vectorType}.ZERO
`;
  for (let i = 0; i < eventChains.length; i++) {
    const event = eventChains[i];
    if (!event.direction) continue;
    code += `	
	# Event ${i + 1}: ${event.key}
`;
    code += `	if Input.is_key_pressed(${event.keyCode}):
`;
    const dimMappings = CHARACTER_CONTROLLER_CONFIG.directionMappings[config.dimension];
    const dir = dimMappings?.[event.direction];
    if (dir) {
      code += `		input_dir.${dir.inputDir} ${dir.operator} ${dir.value.toFixed(1)}
`;
    }
  }
  code += `	
`;
  if (config.dimension === "3D" && config.supportsPhysics) {
    code += `	# Normalize if there's any input
`;
    code += `	if input_dir.length() > 0:
`;
    code += `		input_dir = input_dir.normalized()
	
`;
    code += `	# Apply movement
`;
    code += `	var direction = (transform.basis * input_dir).normalized()
`;
    code += `	if direction and input_dir.length() > 0:
`;
    code += `		velocity.x = direction.x * speed * speed_multiplier
`;
    code += `		velocity.z = direction.z * speed * speed_multiplier
`;
    code += `	else:
`;
    code += `		velocity.x = move_toward(velocity.x, 0, speed)
`;
    code += `		velocity.z = move_toward(velocity.z, 0, speed)
`;
  } else if (config.dimension === "2D" && config.supportsPhysics) {
    code += `	# Normalize if there's any input
`;
    code += `	if input_dir.length() > 0:
`;
    code += `		input_dir = input_dir.normalized()
	
`;
    code += `	# Apply movement
`;
    code += `	if input_dir.length() > 0:
`;
    code += `		velocity.x = input_dir.x * speed * speed_multiplier
`;
    code += `		velocity.y = input_dir.y * speed * speed_multiplier
`;
    code += `	else:
`;
    code += `		velocity.x = move_toward(velocity.x, 0, speed)
`;
    code += `		velocity.y = move_toward(velocity.y, 0, speed)
`;
  }
  if (config.supportsPhysics) {
    code += `	move_and_slide()
`;
  }
  return code;
}
function generateCharacterControllerWithAnimations(extendsClass, config, eventChains) {
  let code = `extends ${extendsClass}

`;
  code += `# Movement Variables
`;
  const speedValue = Number.isInteger(config.defaultSpeed) ? config.defaultSpeed : config.defaultSpeed.toFixed(1);
  code += `var speed: float = ${speedValue}
`;
  if (config.supportsJump) {
    const jumpValue = Number.isInteger(config.jumpVelocity) ? config.jumpVelocity : config.jumpVelocity.toFixed(1);
    code += `var jump_velocity: float = ${jumpValue}
`;
    code += `var gravity = ProjectSettings.get_setting("${config.gravityPath}")
`;
  }
  code += `var is_running: bool = false

`;
  code += `@onready var animation_player = $AnimationPlayer

`;
  code += `func _ready() -> void:
	pass

`;
  code += `func _physics_process(delta: float) -> void:
`;
  if (config.supportsJump) {
    code += `	# Apply gravity
`;
    code += `	if not is_on_floor():
`;
    code += `		velocity.y ${config.gravitySign}= gravity * delta
	
`;
    code += `	# Handle jump
`;
    code += `	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
`;
    code += `		velocity.y = jump_velocity
	
`;
  }
  code += `	# Toggle run mode
`;
  code += `	if Input.is_action_just_pressed("ui_shift"):
`;
  code += `		is_running = !is_running
	
`;
  code += `	# Calculate speed multiplier
`;
  code += `	var speed_multiplier = 2.0 if is_running else 1.0
	
`;
  code += `	# Get input direction
`;
  const vectorType = config.vectorType;
  code += `	var input_dir = ${vectorType}.ZERO
`;
  code += `	var is_moving = false
	
`;
  for (let i = 0; i < eventChains.length; i++) {
    const event = eventChains[i];
    if (!event.direction) continue;
    code += `	# Event ${i + 1}: ${event.key} - Move ${event.direction}
`;
    code += `	if Input.is_key_pressed(${event.keyCode}):
`;
    const dimMappings = CHARACTER_CONTROLLER_CONFIG.directionMappings[config.dimension];
    const dir = dimMappings?.[event.direction];
    if (dir) {
      code += `		input_dir.${dir.inputDir} ${dir.operator} ${dir.value.toFixed(1)}
`;
    }
    code += `		is_moving = true
`;
  }
  code += `	
`;
  code += `	# Normalize input direction if moving
`;
  code += `	if is_moving:
`;
  code += `		input_dir = input_dir.normalized()
`;
  const firstAnimEvent = eventChains.find((e) => e.animationName && e.direction);
  if (firstAnimEvent) {
    const animSpeedValue = firstAnimEvent.animationSpeed === 1 || firstAnimEvent.animationSpeed === 1 ? "1" : firstAnimEvent.animationSpeed;
    code += `		if animation_player:
`;
    code += `			animation_player.play("${firstAnimEvent.animationName}", -1, ${animSpeedValue}, ${firstAnimEvent.animationBackward})
`;
  }
  code += `	else:
`;
  code += `		if animation_player:
`;
  code += `			animation_player.play("idle", -1, 1.0, false)
`;
  code += `	
`;
  if (config.dimension === "3D" && config.supportsPhysics) {
    code += `	# Normalize if there's any input
`;
    code += `	if input_dir.length() > 0:
`;
    code += `		input_dir = input_dir.normalized()
	
`;
    code += `	# Apply movement
`;
    code += `	var direction = (transform.basis * input_dir).normalized()
`;
    code += `	if direction and input_dir.length() > 0:
`;
    code += `		velocity.x = direction.x * speed * speed_multiplier
`;
    code += `		velocity.z = direction.z * speed * speed_multiplier
`;
    code += `	else:
`;
    code += `		velocity.x = move_toward(velocity.x, 0, speed)
`;
    code += `		velocity.z = move_toward(velocity.z, 0, speed)
`;
  } else if (config.dimension === "2D" && config.supportsPhysics) {
    code += `	# Normalize if there's any input
`;
    code += `	if input_dir.length() > 0:
`;
    code += `		input_dir = input_dir.normalized()
	
`;
    code += `	# Apply movement
`;
    code += `	if input_dir.length() > 0:
`;
    code += `		velocity.x = input_dir.x * speed * speed_multiplier
`;
    code += `		velocity.y = input_dir.y * speed * speed_multiplier
`;
    code += `	else:
`;
    code += `		velocity.x = move_toward(velocity.x, 0, speed)
`;
    code += `		velocity.y = move_toward(velocity.y, 0, speed)
`;
  }
  if (config.supportsPhysics) {
    code += `	
	move_and_slide()
`;
  }
  return code;
}
function validateFlowchart(nodes, edges) {
  const errors = [];
  if (nodes.length === 0) {
    return { isValid: false, errors: [{ nodeId: "", message: "Flowchart must have at least one node", severity: "error" }] };
  }
  const nodeMap = /* @__PURE__ */ new Map();
  nodes.forEach((node) => nodeMap.set(node.id, node));
  edges.forEach((edge) => {
    if (!nodeMap.has(edge.source)) {
      errors.push({ nodeId: edge.id, message: `Source node ${edge.source} not found`, severity: "error" });
    }
    if (!nodeMap.has(edge.target)) {
      errors.push({ nodeId: edge.id, message: `Target node ${edge.target} not found`, severity: "error" });
    }
  });
  const hasErrors = errors.some((e) => e.severity === "error");
  return { isValid: !hasErrors, errors };
}

// server/gdscript-formatter.ts
function ensureValidGDScript(code) {
  if (!code || typeof code !== "string") {
    return "";
  }
  let formatted = code.replace(/\r\n/g, "\n");
  formatted = formatted.split("\n").map((line) => {
    const leadingSpaces = line.match(/^[ ]*/)?.[0]?.length || 0;
    const tabs = Math.floor(leadingSpaces / 4);
    const remainder = leadingSpaces % 4;
    const content = line.substring(leadingSpaces);
    if (content.length === 0) {
      return "";
    }
    return "	".repeat(tabs) + " ".repeat(remainder) + content;
  }).join("\n");
  if (!formatted.endsWith("\n")) {
    formatted += "\n";
  }
  return formatted;
}

// server/index.ts
init_gemini();

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path: path3, errorMaps, issueData } = params;
  const fullPath = [...path3, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path3, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path3;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// shared/schema.ts
var aiProviderSchema = external_exports.enum(["gemini", "groq"]);
var aiModelSchema = external_exports.object({
  id: external_exports.string(),
  name: external_exports.string(),
  provider: aiProviderSchema
});
var aiGenerateRequestSchema = external_exports.object({
  provider: aiProviderSchema,
  model: external_exports.string(),
  prompt: external_exports.string(),
  context: external_exports.string().optional()
});
var aiGenerateResponseSchema = external_exports.object({
  code: external_exports.string(),
  explanation: external_exports.string().optional()
});
var nodeInspectorRequestSchema = external_exports.object({
  imageBase64: external_exports.string(),
  fileName: external_exports.string().optional()
});
var detectedNodeSchema = external_exports.object({
  name: external_exports.string(),
  type: external_exports.string(),
  variableName: external_exports.string()
});
var nodeInspectorResponseSchema = external_exports.object({
  nodes: external_exports.array(detectedNodeSchema),
  code: external_exports.string()
});
var codeIssueSchema = external_exports.object({
  lineNo: external_exports.number(),
  type: external_exports.enum(["error", "warning", "suggestion"]),
  issue: external_exports.string(),
  suggestion: external_exports.string()
});
var debugCodeRequestSchema = external_exports.object({
  code: external_exports.string()
});
var debugCodeResponseSchema = external_exports.object({
  issues: external_exports.array(codeIssueSchema),
  isValid: external_exports.boolean()
});
var codeDebuggerRequestSchema = external_exports.object({
  code: external_exports.string(),
  errorText: external_exports.string(),
  errorImageBase64: external_exports.string().optional()
});
var codeDebuggerResponseSchema = external_exports.object({
  extractedError: external_exports.string(),
  suggestions: external_exports.string()
});
var godotNodeCategorySchema = external_exports.enum([
  "Node",
  "Node2D",
  "Node3D",
  "Control",
  "CanvasItem",
  "Resource",
  "AudioStreamPlayer",
  "AnimationPlayer",
  "Physics"
]);
var godotPropertySchema = external_exports.object({
  name: external_exports.string(),
  type: external_exports.string(),
  defaultValue: external_exports.string().optional(),
  description: external_exports.string(),
  scriptable: external_exports.boolean()
});
var godotMethodSchema = external_exports.object({
  name: external_exports.string(),
  returnType: external_exports.string(),
  parameters: external_exports.array(external_exports.object({
    name: external_exports.string(),
    type: external_exports.string(),
    defaultValue: external_exports.string().optional()
  })),
  description: external_exports.string()
});
var godotSignalSchema = external_exports.object({
  name: external_exports.string(),
  parameters: external_exports.array(external_exports.object({
    name: external_exports.string(),
    type: external_exports.string()
  })),
  description: external_exports.string()
});
var godotNodeSchema = external_exports.object({
  name: external_exports.string(),
  category: external_exports.string(),
  inherits: external_exports.string().optional(),
  description: external_exports.string(),
  properties: external_exports.array(godotPropertySchema),
  methods: external_exports.array(godotMethodSchema),
  signals: external_exports.array(godotSignalSchema)
});
var sequenceBlockTypeSchema = external_exports.enum([
  "trigger",
  "action",
  "signal",
  "function",
  "condition",
  "loop"
]);
var sequenceBlockSchema = external_exports.object({
  id: external_exports.string(),
  type: sequenceBlockTypeSchema,
  label: external_exports.string(),
  description: external_exports.string(),
  inputs: external_exports.record(external_exports.string(), external_exports.any()),
  color: external_exports.string(),
  order: external_exports.number()
});
var builtInFunctionSchema = external_exports.enum([
  "_ready",
  "_process",
  "_physics_process",
  "_input",
  "_unhandled_input",
  "_enter_tree",
  "_exit_tree"
]);
var signalTypeSchema = external_exports.enum([
  "button",
  "area",
  "custom",
  "animation",
  "timer",
  "collision"
]);
var rpcModeSchema = external_exports.enum([
  "any_peer",
  "authority"
]);
var rpcTransferModeSchema = external_exports.enum([
  "reliable",
  "unreliable",
  "unreliable_ordered"
]);
var multiplayerConfigSchema = external_exports.object({
  functionName: external_exports.string(),
  rpcMode: rpcModeSchema,
  transferMode: rpcTransferModeSchema,
  callLocal: external_exports.boolean(),
  channel: external_exports.number()
});
var templateCategorySchema = external_exports.enum([
  "enemy",
  "player",
  "vehicle",
  "combat",
  "multiplayer",
  "ui",
  "auth",
  "battle_royale",
  "map"
]);
var templateSchema = external_exports.object({
  id: external_exports.string(),
  name: external_exports.string(),
  category: templateCategorySchema,
  description: external_exports.string(),
  code: external_exports.string(),
  variables: external_exports.array(external_exports.object({
    name: external_exports.string(),
    type: external_exports.string(),
    defaultValue: external_exports.string(),
    description: external_exports.string()
  })),
  previewImage: external_exports.string().optional()
});
var particlePresetSchema = external_exports.object({
  id: external_exports.string(),
  name: external_exports.string(),
  type: external_exports.string(),
  description: external_exports.string(),
  code: external_exports.string(),
  parameters: external_exports.array(external_exports.object({
    name: external_exports.string(),
    type: external_exports.string(),
    defaultValue: external_exports.string(),
    min: external_exports.number().optional(),
    max: external_exports.number().optional(),
    category: external_exports.string().optional()
  }))
});
var codeGenerateRequestSchema = external_exports.object({
  nodeType: external_exports.string(),
  inputs: external_exports.record(external_exports.string(), external_exports.any()),
  builtInFunction: builtInFunctionSchema.optional()
});
var sequenceGenerateRequestSchema = external_exports.object({
  blocks: external_exports.array(sequenceBlockSchema),
  useAI: external_exports.boolean().optional(),
  mode: external_exports.enum(["builtin", "custom-function", "signal"]).default("builtin"),
  builtInFunction: builtInFunctionSchema.optional(),
  customFunctionName: external_exports.string().optional(),
  signalName: external_exports.string().optional()
});
var signalConnectionSchema = external_exports.object({
  sourceNode: external_exports.string(),
  signalName: external_exports.string(),
  targetNode: external_exports.string(),
  methodName: external_exports.string(),
  parameters: external_exports.array(external_exports.string()).optional()
});
var scratchBlockSchema = external_exports.object({
  id: external_exports.string(),
  defType: external_exports.string(),
  values: external_exports.record(external_exports.any()),
  nodeType: external_exports.string().optional(),
  nodePath: external_exports.string().optional()
});
var scratchGenerateRequestSchema = external_exports.object({
  blocks: external_exports.array(scratchBlockSchema)
});
var parsedFunctionSchema = external_exports.object({
  name: external_exports.string(),
  signature: external_exports.string(),
  lineStart: external_exports.number(),
  lineEnd: external_exports.number(),
  parameters: external_exports.array(external_exports.object({
    name: external_exports.string(),
    type: external_exports.string()
  })),
  returnType: external_exports.string()
});
var functionsParseRequestSchema = external_exports.object({
  script: external_exports.string()
});
var functionsParseResponseSchema = external_exports.object({
  functions: external_exports.array(parsedFunctionSchema)
});
var functionsGenerateRequestSchema = external_exports.object({
  script: external_exports.string(),
  selectedFunctions: external_exports.array(external_exports.string()),
  provider: aiProviderSchema,
  model: external_exports.string()
});
var sceneGenerateRequestSchema = external_exports.object({
  script: external_exports.string(),
  provider: aiProviderSchema,
  model: external_exports.string()
});
var sceneGenerateResponseSchema = external_exports.object({
  tscnContent: external_exports.string(),
  nodeCount: external_exports.number()
});
var savedScriptSchema = external_exports.object({
  id: external_exports.string(),
  name: external_exports.string(),
  content: external_exports.string(),
  createdAt: external_exports.number(),
  category: external_exports.string().optional()
});
var insertSavedScriptSchema = external_exports.object({
  name: external_exports.string(),
  content: external_exports.string(),
  category: external_exports.string().optional()
});
var flowchartNodeTypeSchema = external_exports.enum([
  "start",
  "event",
  "movement",
  "rotation",
  "scale",
  "animation",
  "audio",
  "timer",
  "destroy",
  "code",
  "print",
  "comment",
  "condition",
  "loop",
  "variable",
  "function_call",
  "signal",
  "physics",
  "spawn",
  "camera",
  "tween",
  "group",
  "property",
  "input_check",
  "scene",
  "collision",
  "data"
]);
var flowchartNodeSchema = external_exports.object({
  id: external_exports.string(),
  type: flowchartNodeTypeSchema,
  label: external_exports.string(),
  data: external_exports.record(external_exports.any()),
  position: external_exports.object({
    x: external_exports.number(),
    y: external_exports.number()
  })
});
var flowchartEdgeSchema = external_exports.object({
  id: external_exports.string(),
  source: external_exports.string(),
  target: external_exports.string(),
  sourceHandle: external_exports.string().optional(),
  targetHandle: external_exports.string().optional(),
  animated: external_exports.boolean().optional()
});
var flowchartGenerateRequestSchema = external_exports.object({
  nodes: external_exports.array(flowchartNodeSchema),
  edges: external_exports.array(flowchartEdgeSchema),
  builtInFunction: builtInFunctionSchema.optional()
});
var flowchartGenerateResponseSchema = external_exports.object({
  code: external_exports.string(),
  explanation: external_exports.string().optional()
});
var flowchartTemplateSchema = external_exports.object({
  id: external_exports.string(),
  name: external_exports.string(),
  description: external_exports.string().optional(),
  nodes: external_exports.array(flowchartNodeSchema),
  edges: external_exports.array(flowchartEdgeSchema),
  createdAt: external_exports.number()
});
var insertFlowchartTemplateSchema = external_exports.object({
  name: external_exports.string(),
  description: external_exports.string().optional(),
  nodes: external_exports.array(flowchartNodeSchema),
  edges: external_exports.array(flowchartEdgeSchema)
});
var flowchartTemplateListResponseSchema = external_exports.object({
  templates: external_exports.array(flowchartTemplateSchema)
});

// server/player-template-handler.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_meta = {};
var __dirname = import_path.default.dirname((0, import_url.fileURLToPath)(import_meta.url));
var PLAYER_GD_PATH = import_path.default.join(__dirname, "../player.gd");
async function getPlayerTemplate() {
  try {
    const rawCode = import_fs.default.readFileSync(PLAYER_GD_PATH, "utf-8");
    const variables = parseVariables(rawCode);
    const functions = parseFunctions(rawCode);
    return {
      id: "player-template",
      name: "Player Controller",
      code: rawCode,
      variables,
      functions
    };
  } catch (error) {
    console.error("Failed to load player template:", error);
    throw new Error("Failed to load player template");
  }
}
function parseVariables(code) {
  const variables = [];
  const constRegex = /const\s+(\w+)\s*(?::\s*([^\s]+))?\s*=\s*([^\n]+)/g;
  let match;
  while ((match = constRegex.exec(code)) !== null) {
    variables.push({
      name: match[1],
      value: match[3].trim(),
      type: match[2] || "auto"
    });
  }
  const exportRegex = /@export\s+var\s+(\w+)\s*(?::\s*([^\s]+))?\s*=\s*([^\n]+)/g;
  while ((match = exportRegex.exec(code)) !== null) {
    variables.push({
      name: match[1],
      value: match[3]?.trim() || "null",
      type: match[2] || "auto"
    });
  }
  return variables;
}
function parseFunctions(code) {
  const functions = [];
  const funcRegex = /func\s+(_?\w+)\s*\(/g;
  let match;
  const seen = /* @__PURE__ */ new Set();
  while ((match = funcRegex.exec(code)) !== null) {
    const funcName = match[1];
    if (!seen.has(funcName)) {
      functions.push({
        name: funcName,
        enabled: true
      });
      seen.add(funcName);
    }
  }
  return functions;
}
async function generatePlayerScript(selectedFunctions, customVariables, useAI = false, enhancementPrompt) {
  try {
    const template = await getPlayerTemplate();
    if (useAI && selectedFunctions.length > 0 && (selectedFunctions.length < template.functions.length || enhancementPrompt?.trim())) {
      console.log(`[Player] Using AI for generation (${selectedFunctions.length}/${template.functions.length})${enhancementPrompt ? " with enhancement" : ""}`);
      const { generatePlayerScriptWithAI: generatePlayerScriptWithAI2 } = await Promise.resolve().then(() => (init_player_ai_generator(), player_ai_generator_exports));
      const result = await generatePlayerScriptWithAI2({
        fullScript: template.code,
        selectedFunctions,
        customVariables,
        totalFunctions: template.functions.length,
        enhancementPrompt: enhancementPrompt?.trim()
      });
      return result.code;
    }
    let code = template.code;
    for (const [varName, value] of Object.entries(customVariables)) {
      if (value && value.trim()) {
        code = code.replace(
          new RegExp(`(const\\s+${varName}\\s*(?::\\s*[^\\s]+)?\\s*=\\s*)([^\\n]+)`),
          `$1${value}`
        );
        code = code.replace(
          new RegExp(`(@export\\s+var\\s+${varName}\\s*(?::\\s*[^\\s]+)?\\s*=\\s*)([^\\n]+)`),
          `$1${value}`
        );
      }
    }
    if (selectedFunctions.length > 0 && selectedFunctions.length === template.functions.length) {
      code = filterFunctions(code, selectedFunctions);
    }
    return code;
  } catch (error) {
    console.error("Failed to generate player script:", error);
    throw new Error("Failed to generate player script");
  }
}
function filterFunctions(code, selectedFunctions) {
  const lines = code.split("\n");
  const result = [];
  let currentFunc = "";
  let inFunction = false;
  let indent = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    const funcMatch = trimmed.match(/^func\s+(_?\w+)\s*\(/);
    if (funcMatch) {
      currentFunc = funcMatch[1];
      inFunction = selectedFunctions.includes(currentFunc);
      indent = line.match(/^\t*/)?.[0].length || 0;
      if (inFunction) {
        result.push(line);
      }
    } else if (inFunction) {
      if (trimmed.length === 0) {
        result.push(line);
      } else {
        const currentIndent = line.match(/^\t*/)?.[0].length || 0;
        if (currentIndent > indent || trimmed.startsWith("#")) {
          result.push(line);
        } else {
          inFunction = false;
          if (!funcMatch && !line.startsWith("@") && !line.startsWith("const ") && !line.startsWith("var ")) {
            result.push(line);
          }
        }
      }
    } else if (!inFunction && !funcMatch) {
      if (line.startsWith("const ") || line.startsWith("@") || line.startsWith("var ") || line.startsWith("extends ") || trimmed.length === 0 || line.startsWith("#")) {
        result.push(line);
      }
    }
  }
  return result.join("\n").trim();
}

// server/enemy-template-handler.ts
var ZOMBIE_TEMPLATE = `# Zombie Script - Melee Combat System
extends CharacterBody3D

const ZOMBIE_DAMAGE = 15
const MAX_HEALTH = 100
const ROTATION_SPEED = 5.0
const MOVE_SPEED = 1.0

const PRIORITY_DISTANCE = 5.0

@export var sync_players_in_range: Array[int] = []

var players_in_range: Array = []
var player_distances: Dictionary = {}
var group_scan_timer: float = 0.0
var group_scan_interval: float = 0.3
var target_switch_timer: float = 0.0
var target_switch_check_interval: float = 0.2

@export var sync_health: int = MAX_HEALTH
@export var sync_position: Vector3 = Vector3.ZERO
@export var sync_rotation_y: float = 0.0
@export var sync_velocity: Vector3 = Vector3.ZERO
@export var sync_is_attacking: bool = false
@export var sync_current_animation: String = "zombieidle"
@export var sync_target_id: int = 0
@export var sync_is_dead: bool = false 

@onready var health_label: Label3D = $HealthLabel3D
@onready var animation_player: AnimationPlayer = $AnimationPlayer
@onready var player_detector: Area3D = $PlayerDetector
@onready var damage_hitbox: Area3D = $Zombie/Armature/Skeleton3D/Hitbox/Attack

@export_category("Combat Settings")
@export var detection_radius: float = 20.0
@export var attack_range: float = 0.7
@export var attack_cooldown: float = 1.0

var current_health: int = MAX_HEALTH
var target_player: CharacterBody3D = null
var player_in_range: bool = false
var is_attacking: bool = false
var can_attack: bool = true
var can_deal_damage: bool = false
var is_dead: bool = false

func _ready():
        add_to_group("zombie")
        set_multiplayer_authority(1)
        _setup_collision()
        _setup_detector()
        _setup_damage_hitbox()
        _setup_health_label()
        _setup_animations()
        print("Zombie ready on layer 6")
        
func _setup_collision():
        collision_layer = 0
        set_collision_layer_value(4, true)
        collision_mask = 0
        set_collision_mask_value(1, true)
        set_collision_mask_value(2, true)
        set_collision_mask_value(3, true)
        print("Zombie collision: Layer 6, Mask 1,2,3")

func _setup_detector():
        if not player_detector:
                player_detector = Area3D.new()
                player_detector.name = "PlayerDetector"
                add_child(player_detector)
                
                var collision_shape = CollisionShape3D.new()
                var sphere = SphereShape3D.new()
                sphere.radius = detection_radius
                collision_shape.shape = sphere
                player_detector.add_child(collision_shape)
                print("Created PlayerDetector for zombie")
        else:
                var collision_shape = player_detector.get_child(0)
                if collision_shape is CollisionShape3D:
                        var sphere_shape = collision_shape.shape as SphereShape3D
                        if sphere_shape:
                                sphere_shape.radius = detection_radius
        
        player_detector.collision_layer = 0
        player_detector.collision_mask = 0
        player_detector.set_collision_mask_value(5, true)
        player_detector.area_entered.connect(_on_detection_area_entered)
        player_detector.area_exited.connect(_on_detection_area_exited)
        print("Zombie PlayerDetector configured: Mask 5")

func _setup_damage_hitbox():
        if not damage_hitbox:
                damage_hitbox = Area3D.new()
                damage_hitbox.name = "DamageHitbox"
                add_child(damage_hitbox)
                
                var collision_shape = CollisionShape3D.new()
                var sphere = SphereShape3D.new()
                sphere.radius = 1.2
                collision_shape.shape = sphere
                collision_shape.position = Vector3(0, 1, -0.8)
                damage_hitbox.add_child(collision_shape)
                        
        damage_hitbox.collision_layer = 0
        damage_hitbox.set_collision_layer_value(7, true)
        damage_hitbox.collision_mask = 0
        damage_hitbox.set_collision_mask_value(3, true)
        damage_hitbox.monitoring = false
        
        damage_hitbox.body_entered.connect(_on_damage_hitbox_body_entered)

func _setup_health_label():
        if not health_label:
                health_label = Label3D.new()
                health_label.name = "HealthLabel3D"
                add_child(health_label)
                health_label.position = Vector3(0, 2.5, 0)
                health_label.billboard = BaseMaterial3D.BILLBOARD_ENABLED
                health_label.font_size = 32
                print("Created HealthLabel3D for zombie")
        _update_health_ui()

func _setup_animations():
        if animation_player:
                if animation_player.has_animation("zombieidle"):
                        animation_player.play("zombieidle")
                print("Zombie animations ready")

func _physics_process(delta):
        if sync_is_dead:
                if not is_multiplayer_authority() and not is_dead:
                        _die()
                        return
                elif is_multiplayer_authority() and not is_dead:
                        _die()
                return
        
        if is_dead:
                return
                
        if not is_multiplayer_authority():
                global_position = sync_position
                rotation.y = sync_rotation_y
                velocity = sync_velocity
                current_health = sync_health
                is_attacking = sync_is_attacking
                _apply_synced_animation()
                _update_health_ui()
                return
        
        if not is_on_floor():
                velocity.y -= 20.0 * delta
        else:
                velocity.y = 0
        
        group_scan_timer += delta
        if group_scan_timer >= group_scan_interval:
                _scan_for_players_by_group()
                _update_player_distances()
                group_scan_timer = 0.0
        
        target_switch_timer += delta
        if target_switch_timer >= target_switch_check_interval:
                _check_for_priority_target_switch()
                target_switch_timer = 0.0
        
        _validate_current_target()
        
        if players_in_range.size() > 0 and (target_player == null or not is_instance_valid(target_player) or not _is_target_valid(target_player)):
                _acquire_best_target()
        
        if target_player and is_instance_valid(target_player) and _is_target_valid(target_player):
                _rotate_to_face_player(delta)
                
                var distance_to_player = global_position.distance_to(target_player.global_position)
                
                if distance_to_player <= attack_range:
                        velocity = Vector3.ZERO
                        if can_attack and not is_attacking:
                                _start_attack()
                else:
                        if not is_attacking:
                                _move_towards_player()
                                _play_animation("zombiewalk")
        else:
                velocity = Vector3.ZERO
                if not is_attacking:
                        _play_animation("zombieidle")
        
        move_and_slide()
        
        sync_position = global_position
        sync_rotation_y = rotation.y
        sync_velocity = velocity
        sync_health = current_health
        sync_is_attacking = is_attacking
        sync_is_dead = (current_health <= 0)
        
        sync_players_in_range.clear()
        for player in players_in_range:
                if is_instance_valid(player):
                        sync_players_in_range.append(int(player.name))
        
        if animation_player and animation_player.current_animation != "":
                sync_current_animation = animation_player.current_animation
        
        if target_player and is_instance_valid(target_player):
                sync_target_id = int(target_player.name)
        else:
                sync_target_id = 0

func _apply_synced_animation():
        if not animation_player:
                return
        
        if sync_current_animation != "" and animation_player.current_animation != sync_current_animation:
                if animation_player.has_animation(sync_current_animation):
                        animation_player.play(sync_current_animation)
                        if sync_current_animation == "zombiewalk":
                                animation_player.speed_scale = 2.0
                        else:
                                animation_player.speed_scale = 1.0
                        print("CLIENT: Zombie playing synced animation: ", sync_current_animation)
                else:
                        push_warning("Zombie animation not found: ", sync_current_animation)

func _rotate_to_face_player(delta: float):
        if not target_player:
                return
        
        var direction_to_player = target_player.global_position - global_position
        direction_to_player.y = 0
        direction_to_player = direction_to_player.normalized()
        
        if direction_to_player.length() > 0.01:
                var target_rotation = atan2(direction_to_player.x, direction_to_player.z)
                rotation.y = lerp_angle(rotation.y, target_rotation, ROTATION_SPEED * delta)

func _move_towards_player():
        if not target_player:
                return
        
        var direction = (target_player.global_position - global_position).normalized()
        direction.y = 0
        velocity.x = direction.x * MOVE_SPEED
        velocity.z = direction.z * MOVE_SPEED

func _start_attack():
        if is_attacking or not can_attack or is_dead:
                return
        
        is_attacking = true
        sync_is_attacking = true
        can_attack = false
        can_deal_damage = false
        
        var attack_animations = ["Attack1", "Attack2", "Attack3"]
        var chosen_attack = attack_animations[randi() % attack_animations.size()]
        _play_animation(chosen_attack)
        
        print("Zombie attacking with: ", chosen_attack)
        
        await get_tree().create_timer(0.4).timeout
        
        if is_dead:
                return
        
        if damage_hitbox and is_attacking:
                damage_hitbox.monitoring = true
                can_deal_damage = true
                print("Zombie damage hitbox enabled")
        
        await get_tree().create_timer(1.5).timeout
        
        if is_dead:
                return
        
        if damage_hitbox:
                damage_hitbox.monitoring = false
                can_deal_damage = false
                print("Zombie damage hitbox disabled")
        
        await get_tree().create_timer(0.3).timeout
        
        if is_dead:
                return
        
        is_attacking = false
        
        await get_tree().create_timer(attack_cooldown).timeout
        
        if is_dead:
                return
                
        can_attack = true

func _play_animation(anim_name: String):
        if animation_player and animation_player.has_animation(anim_name):
                if animation_player.current_animation != anim_name:
                        animation_player.play(anim_name)
                        if anim_name == "zombiewalk":
                                animation_player.speed_scale = 2.0
                        else:
                                animation_player.speed_scale = 1.0
                        sync_current_animation = anim_name

func _on_damage_hitbox_body_entered(body: Node):
        if is_dead or not can_deal_damage or not is_attacking:
                return
        
        print("Zombie damage hitbox hit body: ", body.name, " in groups: ", body.get_groups())
        
        if body and body.is_in_group("player") and body.has_method("take_damage"):
                body.take_damage(ZOMBIE_DAMAGE, 0, "melee")
                can_deal_damage = false
                print("\u2713 Zombie dealt ", ZOMBIE_DAMAGE, " damage to player ", body.name, "!")

func _on_detection_area_entered(area: Area3D):
        if is_dead:
                return
                
        if area.name == "DetectionArea":
                var player = area.get_parent()
                if player and player.is_in_group("player") and _is_target_valid(player):
                        var distance = global_position.distance_to(player.global_position)
                        
                        if not players_in_range.has(player):
                                players_in_range.append(player)
                                print("\u2705 ZOMBIE AREA DETECTION: Player ", player.name, " entered range (distance: ", distance, ")")
                        
                        if target_player == null or distance < PRIORITY_DISTANCE:
                                target_player = player
                                player_in_range = true
                                print("\u{1F3AF} ZOMBIE IMMEDIATE TARGET: ", player.name)

func _on_detection_area_exited(area: Area3D):
        if area.name == "DetectionArea":
                var player = area.get_parent()
                if player and player.is_in_group("player") and players_in_range.has(player):
                        players_in_range.erase(player)
                        print("\u274C ZOMBIE AREA DETECTION: Player ", player.name, " left range")
                        
                        if player == target_player:
                                target_player = null
                                player_in_range = false
                                _acquire_best_target()

func take_damage(damage: int):
        if sync_is_dead or is_dead:
                return
        
        if not is_multiplayer_authority():
                rpc_id(1, "_apply_damage_on_host", damage)
                return
        
        _apply_damage_on_host(damage)

@rpc("any_peer", "call_local", "reliable")
func _apply_damage_on_host(damage: int):
        if sync_is_dead or is_dead:
                return
        
        if not is_multiplayer_authority():
                return
        
        current_health -= damage
        current_health = max(0, current_health)
        sync_health = current_health
        _update_health_ui()
        
        print("Zombie took ", damage, " damage. Health: ", current_health)
        
        if current_health <= 0:
                sync_is_dead = true
                print("Zombie died! (syncing to clients...)")

func _update_health_ui():
        if health_label:
                health_label.text = str(current_health)
                var health_percent = float(current_health) / float(MAX_HEALTH)
                if health_percent > 0.6:
                        health_label.modulate = Color(0, 1, 0)
                elif health_percent > 0.3:
                        health_label.modulate = Color(1, 1, 0)
                else:
                        health_label.modulate = Color(1, 0, 0)

func _die():
        if is_dead:
                return
        
        is_dead = true
        print("Zombie _die() called! (Authority: ", is_multiplayer_authority(), ")")
        
        if damage_hitbox:
                damage_hitbox.monitoring = false
        if player_detector:
                player_detector.monitoring = false
        
        collision_layer = 0
        collision_mask = 0
        
        if animation_player and animation_player.has_animation("zombiedeath"):
                animation_player.play("zombiedeath")
                await get_tree().create_timer(1.0).timeout
        
        queue_free()

func _scan_for_players_by_group():
        var all_players = get_tree().get_nodes_in_group("player")
        var players_found_this_scan: Array = []
        
        for player in all_players:
                if is_instance_valid(player) and player is CharacterBody3D:
                        var distance = global_position.distance_to(player.global_position)
                        
                        if distance <= detection_radius and _is_target_valid(player):
                                players_found_this_scan.append(player)
                                
                                if not players_in_range.has(player):
                                        players_in_range.append(player)
                                        print("\u2705 ZOMBIE GROUP DETECTION: Player ", player.name, " entered range (distance: ", distance, ")")
        
        for player in players_in_range.duplicate():
                if not players_found_this_scan.has(player):
                        var distance = global_position.distance_to(player.global_position) if is_instance_valid(player) else INF
                        
                        if distance > detection_radius or not _is_target_valid(player):
                                players_in_range.erase(player)
                                print("\u274C ZOMBIE GROUP DETECTION: Player ", player.name if is_instance_valid(player) else "invalid", " left range")
                                
                                if player == target_player:
                                        target_player = null
                                        player_in_range = false
                                        print("\u{1F3AF} Zombie target lost, will acquire new target")

func _update_player_distances():
        player_distances.clear()
        
        for player in players_in_range:
                if is_instance_valid(player):
                        var distance = global_position.distance_to(player.global_position)
                        player_distances[player] = distance

func _check_for_priority_target_switch():
        if players_in_range.size() <= 1:
                return
        
        var closest_player: CharacterBody3D = null
        var closest_distance: float = INF
        var priority_player: CharacterBody3D = null
        
        for player in players_in_range:
                if is_instance_valid(player) and _is_target_valid(player):
                        var distance = player_distances.get(player, global_position.distance_to(player.global_position))
                        
                        if distance < PRIORITY_DISTANCE:
                                if priority_player == null or distance < global_position.distance_to(priority_player.global_position):
                                        priority_player = player
                        
                        if distance < closest_distance:
                                closest_distance = distance
                                closest_player = player
        
        if priority_player:
                if target_player != priority_player:
                        target_player = priority_player
                        player_in_range = true
                        print("\u{1F3AF} ZOMBIE PRIORITY TARGET: ", priority_player.name, " (within 5m)")
                        if is_attacking:
                                is_attacking = false
                                can_attack = true
        elif closest_player:
                if target_player != closest_player:
                        target_player = closest_player
                        player_in_range = true
                        print("\u{1F3AF} ZOMBIE TARGET ACQUIRED: ", closest_player.name, " at distance: ", closest_distance)

func _acquire_best_target():
        var closest_player: CharacterBody3D = null
        var closest_distance: float = INF
        var priority_player: CharacterBody3D = null
        
        for player in players_in_range:
                if is_instance_valid(player) and _is_target_valid(player):
                        var distance = player_distances.get(player, global_position.distance_to(player.global_position))
                        
                        if distance < PRIORITY_DISTANCE:
                                if priority_player == null or distance < global_position.distance_to(priority_player.global_position):
                                        priority_player = player
                        
                        if distance < closest_distance:
                                closest_distance = distance
                                closest_player = player
        
        if priority_player:
                target_player = priority_player
                player_in_range = true
                print("\u{1F3AF} ZOMBIE PRIORITY TARGET: ", priority_player.name, " (within 5m)")
        elif closest_player:
                target_player = closest_player
                player_in_range = true
                print("\u{1F3AF} ZOMBIE TARGET ACQUIRED: ", closest_player.name, " at distance: ", closest_distance)
        else:
                target_player = null
                player_in_range = false
                print("\u26A0\uFE0F Zombie: No valid targets available")

func _is_target_valid(player: CharacterBody3D) -> bool:
        if not player or not is_instance_valid(player):
                return false
        
        if player.has_method("get") and player.get("sync_is_dead"):
                if player.sync_is_dead:
                        return false
        
        var distance = global_position.distance_to(player.global_position)
        if distance > detection_radius:
                return false
        
        if player.has_method("get") and player.get("is_spectator"):
                if player.is_spectator:
                        return false
        
        return true

func _validate_current_target():
        if target_player and is_instance_valid(target_player):
                if not _is_target_valid(target_player):
                        print("\u26A0\uFE0F Zombie current target invalid: ", target_player.name)
                        target_player = null
                        player_in_range = false
        else:
                target_player = null
                player_in_range = false
`;
var SPAWNER_TEMPLATE = `# Enemy Spawner - Attach to a Node3D to spawn enemies
extends Node3D

@export var zombie_scene: PackedScene
@export var spawn_interval: float = 5.0
@export var max_zombies: int = 5
@export var spawn_radius_min: float = 8.0
@export var spawn_radius_max: float = 20.0

var active_zombies: Array = []
var spawn_timer: Timer
var player: CharacterBody3D
var player_original_forward: Vector3

func _ready():
        print("Zombie Spawner initialized")
        setup_spawn_timer()
        find_player()
        
        if player:
                player_original_forward = player.global_transform.basis.z.normalized()
                player_original_forward.y = 0
                print("Player original forward direction stored: ", player_original_forward)
        
        if not zombie_scene:
                zombie_scene = load("res://Scenes/zombie.tscn")
                if not zombie_scene:
                        print("ERROR: Could not load zombie scene! Check the path.")
                        return
        
        print("Zombie scene loaded successfully")
        
        await get_tree().create_timer(2.0).timeout
        print("Testing manual spawn...")
        debug_spawn()

func setup_spawn_timer():
        spawn_timer = Timer.new()
        add_child(spawn_timer)
        
        spawn_timer.wait_time = spawn_interval
        spawn_timer.timeout.connect(_on_spawn_timer_timeout)
        
        spawn_timer.start()
        
        print("Spawn timer setup complete - interval: ", spawn_interval, " seconds")
        print("Timer started: ", spawn_timer.is_stopped() == false)

func find_player():
        var players = get_tree().get_nodes_in_group("player")
        if players.size() > 0:
                player = players[0]
                print("Player found by group: ", player.name)
                return
        
        var potential_paths = [
                "../Player",
                "Player", 
                "../Penny2/Penny",
                "Penny2/Penny",
                "CharacterBody3D"
        ]
        
        for path in potential_paths:
                var node = get_node_or_null(path)
                if node and node is CharacterBody3D:
                        player = node
                        print("Player found at path: ", path)
                        return
        
        print("WARNING: Player not found! Make sure player is in 'player' group or adjust paths.")

func _on_spawn_timer_timeout():
        print("Spawn timer triggered - Active zombies: ", active_zombies.size(), "/", max_zombies)
        
        if active_zombies.size() < max_zombies and player:
                spawn_zombie()
                spawn_timer.start()
        elif not player:
                print("Cannot spawn - no player found")
                spawn_timer.start()
        else:
                print("Max zombies reached, waiting...")
                spawn_timer.start()

func spawn_zombie():
        if not zombie_scene:
                print("ERROR: No zombie scene assigned!")
                return
        
        if not player:
                print("ERROR: No player found for spawning!")
                return
        
        print("Spawning zombie...")
        
        var zombie = zombie_scene.instantiate()
        if not zombie:
                print("ERROR: Failed to instantiate zombie!")
                return
        
        get_parent().add_child(zombie)
        
        var forward_direction = player_original_forward
        
        var spawn_pos = player.global_position
        var distance = randf_range(spawn_radius_min, spawn_radius_max)
        
        var max_angle_variation = deg_to_rad(15.0)
        var angle_variation = randf_range(-max_angle_variation, max_angle_variation)
        
        var rotated_forward = Vector3(
                forward_direction.x * cos(angle_variation) - forward_direction.z * sin(angle_variation),
                0,
                forward_direction.x * sin(angle_variation) + forward_direction.z * cos(angle_variation)
        )
        
        spawn_pos += rotated_forward * distance
        
        spawn_pos.y = player.global_position.y
        
        zombie.global_position = spawn_pos
        
        print("Zombie spawn position: ", spawn_pos)
        print("Player position: ", player.global_position)
        print("Using original forward direction: ", forward_direction)
        print("Angle variation (degrees): ", rad_to_deg(angle_variation))
        print("Distance from player: ", player.global_position.distance_to(spawn_pos))
        
        if zombie.has_signal("zombie_died"):
                zombie.zombie_died.connect(_on_zombie_died.bind(zombie))
        
        active_zombies.append(zombie)
        
        print("Zombie spawned successfully! Total active: ", active_zombies.size())

func _on_zombie_died(zombie):
        print("Zombie died, removing from active list")
        if zombie in active_zombies:
                active_zombies.erase(zombie)
        print("Active zombies remaining: ", active_zombies.size())

func debug_spawn():
        spawn_zombie()

func _input(event):
        if event is InputEventKey and event.pressed:
                if event.keycode == KEY_Z:
                        print("Manual spawn triggered by Z key")
                        debug_spawn()
`;
var RANGED_TEMPLATE = `extends CharacterBody3D

const ENEMY_DAMAGE = 10
const MAX_HEALTH = 100
const ROTATION_SPEED = 5.0
const PRIORITY_DISTANCE = 5.0

@onready var raycast: RayCast3D = $ShootPosition/RayCast3D
@onready var player_detector: Area3D = $PlayerDetector
@onready var health_label: Label3D = $HealthLabel3D
@onready var animation_player: AnimationPlayer = $AnimationPlayer
@onready var line_of_sight: Area3D = $ShootPosition/LineOfSightArea

@onready var walk_sound: AudioStreamPlayer3D = $WalkSound
@onready var fire_sound: AudioStreamPlayer3D = $FireSound
@onready var hit_sound: AudioStreamPlayer3D = $HitSound

@export var sync_health: int = MAX_HEALTH
@export var sync_position: Vector3 = Vector3.ZERO
@export var sync_rotation_y: float = 0.0
@export var sync_is_shooting: bool = false
@export var sync_target_id: int = 0
@export var sync_is_dead: bool = false 
@export var sync_current_animation: String = "RifleIdle"
@export var sync_players_in_range: Array[int] = []

@export var footstep_counter: int = 0
@export var fire_counter: int = 0
@export var hit_counter: int = 0
@export var footstep_type: String = "walk"

@export_category("Combat Settings")
@export var fire_rate: float = 1.5
@export var detection_radius: float = 20.0

var last_hit_counter: int = 0
var last_fire_counter: int = 0
var last_footstep_counter: int = 0
var last_sync_position: Vector3 = Vector3.ZERO
var velocity_stopped_frames: int = 0
var required_stopped_frames: int = 2

var footstep_timer: float = 0.0
var walk_footstep_interval: float = 0.6
var current_health: int = MAX_HEALTH
var can_shoot: bool = true
var player_in_range: bool = false
var target_player: CharacterBody3D = null
var is_shooting: bool = false
var players_in_range: Array = []
var player_distances: Dictionary = {}
var group_scan_timer: float = 0.0
var group_scan_interval: float = 0.3
var target_switch_timer: float = 0.0
var target_switch_check_interval: float = 0.2
var is_dead: bool = false

func _ready():
        set_multiplayer_authority(1)
        current_health = sync_health
        _setup_collision()
        _setup_raycast()
        _setup_detector()
        _setup_line_of_sight()
        _setup_health_label()
        _setup_audio_nodes()
        
        print("Ranged Enemy ready - Authority: ", get_multiplayer_authority(), " | Peer: ", multiplayer.get_unique_id())

func _setup_collision():
        collision_layer = 0
        set_collision_layer_value(4, true)
        collision_mask = 0
        set_collision_mask_value(1, true)
        set_collision_mask_value(2, true)
        set_collision_mask_value(3, true)
        
func _setup_raycast():
        if not raycast:
                return
                
        raycast.enabled = true
        raycast.target_position = Vector3(0, 0, -50)
        raycast.collision_mask = 0
        raycast.set_collision_mask_value(4, true)
        raycast.set_collision_mask_value(1, true)
        raycast.set_collision_mask_value(2, true)
        
func _setup_line_of_sight():
        if not line_of_sight:
                return
        
        line_of_sight.collision_layer = 0
        line_of_sight.collision_mask = 0
        line_of_sight.set_collision_mask_value(4, true)

func _setup_detector():
        if not player_detector:
                return
                
        var collision_shape = player_detector.get_child(0)
        if collision_shape is CollisionShape3D:
                var sphere_shape = collision_shape.shape as SphereShape3D
                if sphere_shape:
                        sphere_shape.radius = detection_radius
        
        player_detector.collision_layer = 0
        player_detector.collision_mask = 0
        player_detector.set_collision_mask_value(4, true)
        
        if is_multiplayer_authority():
                player_detector.area_entered.connect(_on_detection_area_entered)
                player_detector.area_exited.connect(_on_detection_area_exited)

func _setup_health_label():
        if not health_label:
                health_label = Label3D.new()
                health_label.name = "HealthLabel3D"
                add_child(health_label)
                health_label.position = Vector3(0, 2, 0)
                health_label.billboard = BaseMaterial3D.BILLBOARD_ENABLED
        _update_health_ui()

func _setup_audio_nodes():
        if walk_sound:
                walk_sound.bus = "SFX"
                walk_sound.max_distance = 8.0
                walk_sound.unit_size = 3.0
                walk_sound.attenuation_filter_cutoff_hz = 5000
                walk_sound.attenuation_filter_db = 24.0
                
        if fire_sound:
                fire_sound.bus = "SFX"
                fire_sound.max_distance = 20.0
                fire_sound.unit_size = 4.0
                fire_sound.attenuation_filter_cutoff_hz = 5000
                fire_sound.attenuation_filter_db = 24.0
                
        if hit_sound:
                hit_sound.bus = "SFX"
                hit_sound.max_distance = 12.0
                hit_sound.unit_size = 3.0
                hit_sound.attenuation_filter_cutoff_hz = 5000
                hit_sound.attenuation_filter_db = 24.0

func _physics_process(delta):
        if sync_is_dead:
                if not is_multiplayer_authority() and not is_dead:
                        _die()
                        return
                elif is_multiplayer_authority() and not is_dead:
                        _die()
                return
        
        if is_dead:
                return
        
        if not is_multiplayer_authority():
                global_position = sync_position
                rotation.y = sync_rotation_y
                current_health = sync_health
                is_shooting = sync_is_shooting
                _apply_synced_animation()
                _update_health_ui()
                return
        
        if not is_on_floor():
                velocity.y -= 20.0 * delta
        else:
                velocity.y = 0
        move_and_slide()
        
        group_scan_timer += delta
        if group_scan_timer >= group_scan_interval:
                _scan_for_players_by_group()
                _update_player_distances()
                group_scan_timer = 0.0
        
        target_switch_timer += delta
        if target_switch_timer >= target_switch_check_interval:
                _check_for_priority_target_switch()
                target_switch_timer = 0.0
        
        _validate_current_target()
        
        if players_in_range.size() > 0 and (target_player == null or not is_instance_valid(target_player) or not _is_target_valid(target_player)):
                _acquire_best_target()
        
        if target_player and is_instance_valid(target_player) and _is_target_valid(target_player):
                _rotate_to_face_player(delta)
                
                var can_see_player = _check_can_see_player()
                
                if can_see_player:
                        if not is_shooting:
                                _start_shooting_animation()
                        
                        if can_shoot:
                                _fire_at_player()
                else:
                        if is_shooting:
                                _stop_shooting_animation()
        else:
                _stop_shooting_animation()
        
        _update_footstep_audio(delta)
        
        sync_position = global_position
        sync_rotation_y = rotation.y
        sync_health = current_health
        sync_is_shooting = is_shooting
        sync_is_dead = (current_health <= 0)
        
        sync_players_in_range.clear()
        for player in players_in_range:
                if is_instance_valid(player):
                        sync_players_in_range.append(int(player.name))
        
        if animation_player and animation_player.current_animation != "":
                sync_current_animation = animation_player.current_animation
        
        if target_player and is_instance_valid(target_player):
                sync_target_id = int(target_player.name)
        else:
                sync_target_id = 0

func _process(_delta):
        if sync_is_dead:
                if not is_multiplayer_authority() and not is_dead:
                        _die()
                return
                
        if not is_multiplayer_authority():
                _check_remote_audio()
                _check_remote_audio_stop()
                _update_health_ui()

func _update_player_distances():
        player_distances.clear()
        
        for player in players_in_range:
                if is_instance_valid(player):
                        var distance = global_position.distance_to(player.global_position)
                        player_distances[player] = distance

func _check_for_priority_target_switch():
        if players_in_range.size() <= 1:
                return
        
        var current_target_visible = false
        if target_player and is_instance_valid(target_player) and _is_target_valid(target_player):
                current_target_visible = _check_can_see_player()
        
        var closest_player: CharacterBody3D = null
        var closest_distance: float = INF
        var closest_firable_player: CharacterBody3D = null
        var closest_firable_distance: float = INF
        
        for player in players_in_range:
                if is_instance_valid(player) and _is_target_valid(player):
                        var distance = player_distances.get(player, global_position.distance_to(player.global_position))
                        
                        if distance < closest_distance:
                                closest_distance = distance
                                closest_player = player
                        
                        var temp_target = target_player
                        target_player = player
                        var has_los = _check_can_see_player()
                        target_player = temp_target
                        
                        if has_los and distance < closest_firable_distance:
                                closest_firable_distance = distance
                                closest_firable_player = player
        
        if not current_target_visible and closest_firable_player:
                if target_player != closest_firable_player:
                        print("\u{1F3AF} IMMEDIATE SWITCH: Current target not visible, switching to firable player ", closest_firable_player.name)
                        target_player = closest_firable_player
                        player_in_range = true
                        if is_shooting:
                                _stop_shooting_animation()
                        return
        
        if closest_player and closest_distance < PRIORITY_DISTANCE:
                if target_player != closest_player:
                        print("\u26A0\uFE0F PRIORITY SWITCH: Player ", closest_player.name, " is within ", closest_distance, "m - switching target!")
                        target_player = closest_player
                        player_in_range = true
                        if is_shooting:
                                _stop_shooting_animation()
                        return
        
        if target_player == null or not is_instance_valid(target_player) or not _is_target_valid(target_player):
                if closest_player:
                        print("\u{1F3AF} Target lost, switching to: ", closest_player.name)
                        target_player = closest_player
                        player_in_range = true

func _scan_for_players_by_group():
        var all_players = get_tree().get_nodes_in_group("player")
        var players_found_this_scan: Array = []
        
        for player in all_players:
                if is_instance_valid(player) and player is CharacterBody3D:
                        var distance = global_position.distance_to(player.global_position)
                        
                        if distance <= detection_radius and _is_target_valid(player):
                                players_found_this_scan.append(player)
                                
                                if not players_in_range.has(player):
                                        players_in_range.append(player)
                                        print("\u2705 GROUP DETECTION: Player ", player.name, " entered range (distance: ", distance, ")")
                                        
                                        rpc("_sync_player_detected", int(player.name), distance)
        
        for player in players_in_range.duplicate():
                if not players_found_this_scan.has(player):
                        var distance = global_position.distance_to(player.global_position) if is_instance_valid(player) else INF
                        
                        if distance > detection_radius or not _is_target_valid(player):
                                players_in_range.erase(player)
                                print("\u274C GROUP DETECTION: Player ", player.name if is_instance_valid(player) else "invalid", " left range")
                                
                                if player == target_player:
                                        target_player = null
                                        player_in_range = false
                                        print("\u{1F3AF} Current target lost, will acquire new target")

@rpc("authority", "call_local", "reliable")
func _sync_player_detected(player_id: int, distance: float):
        if not is_multiplayer_authority():
                print("CLIENT: Received detection sync - Player ", player_id, " at distance ", distance)

func _on_detection_area_entered(area: Area3D):
        if not is_multiplayer_authority():
                return
        
        var player = area.get_parent()
        
        if player and player.is_in_group("player") and _is_target_valid(player):
                if not players_in_range.has(player):
                        players_in_range.append(player)
                        var distance = global_position.distance_to(player.global_position)
                        print("\u2705 AREA DETECTION: Player ", player.name, " entered range (distance: ", distance, ")")
                        
                        if target_player == null or distance < PRIORITY_DISTANCE:
                                target_player = player
                                player_in_range = true
                                print("\u{1F3AF} IMMEDIATE TARGET: ", player.name)

func _on_detection_area_exited(area: Area3D):
        if not is_multiplayer_authority():
                return
        
        var player = area.get_parent()
        
        if player and player.is_in_group("player") and players_in_range.has(player):
                players_in_range.erase(player)
                print("\u274C AREA DETECTION: Player ", player.name, " left range")
                
                if player == target_player:
                        target_player = null
                        player_in_range = false
                        _acquire_best_target()

func _validate_current_target():
        if target_player and is_instance_valid(target_player):
                if not _is_target_valid(target_player):
                        print("\u26A0\uFE0F Current target invalid: ", target_player.name)
                        target_player = null
        else:
                target_player = null

func _is_target_valid(player: CharacterBody3D) -> bool:
        if not player or not is_instance_valid(player):
                return false
        
        if player.has_method("get") and player.get("sync_is_dead"):
                if player.sync_is_dead:
                        return false
        
        var distance = global_position.distance_to(player.global_position)
        if distance > detection_radius:
                return false
        
        if player.has_method("get") and player.get("is_spectator"):
                if player.is_spectator:
                        return false
        
        return true

func _acquire_best_target():
        var closest_player: CharacterBody3D = null
        var closest_distance: float = INF
        var priority_player: CharacterBody3D = null
        
        for player in players_in_range:
                if is_instance_valid(player) and _is_target_valid(player):
                        var distance = player_distances.get(player, global_position.distance_to(player.global_position))
                        
                        if distance < PRIORITY_DISTANCE:
                                if priority_player == null or distance < global_position.distance_to(priority_player.global_position):
                                        priority_player = player
                        
                        if distance < closest_distance:
                                closest_distance = distance
                                closest_player = player
        
        if priority_player:
                target_player = priority_player
                player_in_range = true
                print("\u{1F3AF} PRIORITY TARGET: ", priority_player.name, " (within 5m)")
        elif closest_player:
                target_player = closest_player
                player_in_range = true
                print("\u{1F3AF} TARGET ACQUIRED: ", closest_player.name, " at distance: ", closest_distance)
        else:
                target_player = null
                player_in_range = false
                print("\u26A0\uFE0F No valid targets available")

func _check_remote_audio():
        if footstep_counter != last_footstep_counter:
                _play_footstep_sound_client(footstep_type)
                last_footstep_counter = footstep_counter
        
        if fire_counter != last_fire_counter:
                _play_fire_sound_client()
                last_fire_counter = fire_counter
        
        if hit_counter != last_hit_counter:
                _play_hit_sound_client()
                last_hit_counter = hit_counter

func _check_remote_audio_stop():
        if is_multiplayer_authority():
                return
        
        var is_stopped_now = sync_position.distance_to(last_sync_position) < 0.1
        
        if is_stopped_now:
                velocity_stopped_frames += 1
        else:
                velocity_stopped_frames = 0
                last_sync_position = sync_position
        
        if velocity_stopped_frames >= required_stopped_frames:
                _stop_footstep_sounds()
                velocity_stopped_frames = required_stopped_frames

func _stop_footstep_sounds():
        if walk_sound and walk_sound.playing:
                walk_sound.stop()

func _apply_synced_animation():
        if not animation_player:
                return
        
        if sync_current_animation != "" and animation_player.current_animation != sync_current_animation:
                if animation_player.has_animation(sync_current_animation):
                        animation_player.play(sync_current_animation)
                else:
                        push_warning("Animation not found: ", sync_current_animation)

func _rotate_to_face_player(delta: float):
        if not target_player or not is_instance_valid(target_player):
                return
        
        var direction_to_player = target_player.global_position - global_position
        direction_to_player.y = 0
        direction_to_player = direction_to_player.normalized()
        
        if direction_to_player.length() > 0.01:
                var target_rotation = atan2(direction_to_player.x, direction_to_player.z)
                rotation.y = lerp_angle(rotation.y, target_rotation, ROTATION_SPEED * delta)

func _check_can_see_player() -> bool:
        if not target_player or not is_instance_valid(target_player):
                return false
        
        var space_state = get_world_3d().direct_space_state
        var origin = global_position + Vector3(0, 1.5, 0)
        var target_pos = target_player.global_position + Vector3(0, 1.0, 0)
        
        var query = PhysicsRayQueryParameters3D.create(origin, target_pos)
        query.collision_mask = 1 | 2 | 4
        query.exclude = [self]
        
        var result = space_state.intersect_ray(query)
        
        if result:
                var collider = result.collider
                if collider == target_player or (collider and collider.is_in_group("player")):
                        return true
                else:
                        return false
        
        return false

func take_damage(damage: int):
        if sync_is_dead:
                return
        
        if is_multiplayer_authority():
                _apply_damage_on_host(damage)
        else:
                rpc_id(1, "_apply_damage_on_host", damage)

@rpc("any_peer", "call_local", "reliable")
func _apply_damage_on_host(damage: int):
        if sync_is_dead or is_dead:
                return
        
        if not is_multiplayer_authority():
                return
        
        current_health -= damage
        current_health = max(0, current_health)
        sync_health = current_health
        _update_health_ui()
        
        print("Ranged Enemy took ", damage, " damage. Health: ", current_health)
        
        if current_health <= 0:
                sync_is_dead = true
                print("Ranged Enemy died! (syncing to clients...)")

func _update_health_ui():
        if health_label:
                health_label.text = str(current_health)
                var health_percent = float(current_health) / float(MAX_HEALTH)
                if health_percent > 0.6:
                        health_label.modulate = Color(0, 1, 0)
                elif health_percent > 0.3:
                        health_label.modulate = Color(1, 1, 0)
                else:
                        health_label.modulate = Color(1, 0, 0)

func _update_footstep_audio(delta: float):
        if not is_multiplayer_authority():
                return
        
        footstep_timer += delta
        if footstep_timer >= walk_footstep_interval:
                footstep_type = "walk"
                footstep_counter += 1
                _play_footstep_sound_host(footstep_type)
                footstep_timer = 0.0
        else:
                _stop_footstep_sounds()
                footstep_timer = 0.0

func _play_footstep_sound_host(type: String):
        if walk_sound:
                walk_sound.play()

func _play_footstep_sound_client(type: String):
        if walk_sound:
                walk_sound.play()

func _play_fire_sound_host():
        if fire_sound:
                fire_sound.play()

func _play_fire_sound_client():
        if fire_sound:
                fire_sound.play()

func _play_hit_sound_client():
        if hit_sound:
                hit_sound.play()

func _start_shooting_animation():
        is_shooting = true
        sync_is_shooting = true
        if animation_player and animation_player.has_animation("RifleShoot"):
                animation_player.play("RifleShoot")
                sync_current_animation = "RifleShoot"

func _stop_shooting_animation():
        is_shooting = false
        sync_is_shooting = false
        if animation_player and animation_player.has_animation("RifleIdle"):
                animation_player.play("RifleIdle")
                sync_current_animation = "RifleIdle"

func _fire_at_player():
        if not target_player or not is_instance_valid(target_player):
                return

        can_shoot = false
        fire_counter += 1
        _play_fire_sound_host()

        print("\u{1F52B} HOST: Firing at player: ", target_player.name)

        if _check_can_see_player():
                if target_player.has_method("take_damage"):
                        target_player.take_damage(ENEMY_DAMAGE)
                        print("\u{1F4A5} HOST: Dealt ", ENEMY_DAMAGE, " damage to player: ", target_player.name)

        await get_tree().create_timer(fire_rate).timeout
        can_shoot = true

func _die():
        if is_dead:
                return

        is_dead = true
        print("Ranged Enemy _die() called! (Authority: ", is_multiplayer_authority(), ")")

        if player_detector:
                player_detector.monitoring = false

        collision_layer = 0
        collision_mask = 0

        if animation_player and animation_player.has_animation("Death"):
                animation_player.play("Death")
                sync_current_animation = "Death"
                await get_tree().create_timer(1.0).timeout

        queue_free()
`;
function getEnemyTemplate(type) {
  let code = "";
  if (type === "zombie") {
    code = ZOMBIE_TEMPLATE;
  } else if (type === "ranged") {
    code = RANGED_TEMPLATE;
  } else {
    code = SPAWNER_TEMPLATE;
  }
  const variables = parseVariables2(code);
  const functions = parseFunctions2(code);
  return {
    type,
    code,
    variables,
    functions
  };
}
function parseVariables2(code) {
  const variables = [];
  const exportRegex = /@export var (\w+): (\w+(?:<[^>]+>)?) = ([^\n]+)/g;
  let match;
  while ((match = exportRegex.exec(code)) !== null) {
    variables.push({
      name: match[1],
      type: match[2],
      value: match[3].trim()
    });
  }
  return variables;
}
function parseFunctions2(code) {
  const functions = [];
  const funcRegex = /func (_?\w+)\([^)]*\)[^:]*:/g;
  let match;
  const seen = /* @__PURE__ */ new Set();
  while ((match = funcRegex.exec(code)) !== null) {
    const funcName = match[1];
    if (!seen.has(funcName)) {
      functions.push({
        name: funcName,
        signature: match[0].slice(0, -1)
      });
      seen.add(funcName);
    }
  }
  return functions;
}
function applyVarsToTemplate(template, customVars) {
  let code = template.code;
  for (const variable of template.variables) {
    if (customVars[variable.name] !== void 0) {
      const oldValue = `@export var ${variable.name}: ${variable.type} = ${variable.value}`;
      const newValue = `@export var ${variable.name}: ${variable.type} = ${customVars[variable.name]}`;
      code = code.replace(oldValue, newValue);
    }
  }
  return code;
}
function selectiveFunctions(template, selectedFunctions) {
  let code = template.code;
  const allFunctions = template.functions;
  for (const func of allFunctions) {
    if (!selectedFunctions.has(func.name)) {
      const funcRegex = new RegExp(
        `func ${func.name}\\([^)]*\\)[^:]*:.*?(?=func|$)`,
        "s"
      );
      code = code.replace(funcRegex, "");
    }
  }
  return code;
}

// server/enemy-ai-generator.ts
var genaiModule = __toESM(require("@google/genai"), 1);
var geminiApiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
var groqApiKey2 = process.env.GROQ_API_KEY;
async function generateEnemyAIScript(baseCode, selectedFunctions, enhancementPrompt) {
  try {
    if (geminiApiKey) {
      return await generateWithGemini2(baseCode, selectedFunctions, enhancementPrompt);
    } else if (groqApiKey2) {
      return await generateWithGroq2(baseCode, selectedFunctions, enhancementPrompt);
    } else {
      console.warn("No AI API keys available, returning base code");
      return baseCode;
    }
  } catch (error) {
    console.error("Error generating enemy AI script:", error);
    return baseCode;
  }
}
async function generateWithGemini2(baseCode, selectedFunctions, enhancementPrompt) {
  const genAI = new genaiModule.GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `You are a GDScript expert. Enhance this enemy AI script:

Original Code:
\`\`\`gdscript
${baseCode}
\`\`\`

Selected Functions to Keep: ${selectedFunctions.join(", ")}

${enhancementPrompt ? `Enhancement Request: ${enhancementPrompt}` : ""}

Requirements:
1. Keep ONLY the selected functions from the list
2. Maintain all @export variables
3. Remove unused functions
4. Keep the class structure intact
5. Ensure the code is 100% working GDScript
6. ${enhancementPrompt ? `Apply this enhancement: ${enhancementPrompt}` : "Keep the original behavior"}

Return ONLY valid GDScript code without explanation.`;
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  const cleanCode = response.replace(/```gdscript\n?/g, "").replace(/```\n?/g, "").trim();
  return cleanCode;
}
async function generateWithGroq2(baseCode, selectedFunctions, enhancementPrompt) {
  const axios = (await import("axios")).default;
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "user",
          content: `You are a GDScript expert. Enhance this enemy AI script:

Original Code:
\`\`\`gdscript
${baseCode}
\`\`\`

Selected Functions to Keep: ${selectedFunctions.join(", ")}

${enhancementPrompt ? `Enhancement Request: ${enhancementPrompt}` : ""}

Requirements:
1. Keep ONLY the selected functions from the list
2. Maintain all @export variables
3. Remove unused functions
4. Keep the class structure intact
5. Ensure the code is 100% working GDScript
6. ${enhancementPrompt ? `Apply this enhancement: ${enhancementPrompt}` : "Keep the original behavior"}

Return ONLY valid GDScript code without explanation.`
        }
      ],
      temperature: 0.3,
      max_tokens: 2e3
    },
    {
      headers: {
        Authorization: `Bearer ${groqApiKey2}`
      }
    }
  );
  const content = response.data.choices[0].message.content;
  const cleanCode = content.replace(/```gdscript\n?/g, "").replace(/```\n?/g, "").trim();
  return cleanCode;
}

// server/vehicle-template-handler.ts
var CAR_TEMPLATE = `extends CharacterBody3D

# Movement settings
@export var speed: float = 18.0
@export var max_rotation_speed: float = 2.0
@export var custom_gravity: float = 20.0
@export var alignment_speed: float = 8.0

# Smooth acceleration settings
@export var acceleration: float = 5.0
@export var deceleration: float = 8.0
@export var handbrake_deceleration: float = 15.0

# Turning settings
@export var turn_angle: float = 30.0
@export var turn_speed: float = 5.0

# Audio settings
@export var min_pitch: float = 0.8
@export var max_pitch: float = 1.5

# References
@onready var animation_player: AnimationPlayer = $AnimationPlayer
@onready var camera: Camera3D = $Camera3D
@onready var car_visual: Node3D = $car
@onready var car1_sound: AudioStreamPlayer3D = $Car1
@onready var car2_sound: AudioStreamPlayer3D = $Car2

# Camera settings
var mouse_sensitivity: float = 0.002
var camera_rotation: Vector2 = Vector2.ZERO
var initial_visual_rotation: float = 0.0
var mouse_locked: bool = false

# Movement state
var current_speed: float = 0.0
var target_speed: float = 0.0
var is_handbrake: bool = false
var last_floor_normal: Vector3 = Vector3.UP
var current_yaw: float = 0.0
var last_position: Vector3 = Vector3.ZERO
var actual_speed: float = 0.0

# Turning state
var current_turn_angle: float = 0.0
var target_turn_angle: float = 0.0
var is_turning: bool = false
var is_actually_moving: bool = false

# Audio state
var is_car1_playing: bool = false
var was_moving: bool = false
var audio_streams_loaded: bool = false
var fallback_car1_stream: AudioStream
var fallback_car2_stream: AudioStream

# ============ DRIVER VARIABLES ============
@export var enter_area: Area3D = null
@export var seat_marker: Marker3D = null
@export var is_driver_occupied: bool = false
@export var driver_id: int = -1
var current_driver: Node3D = null
var driver_original_transform: Transform3D
var seat_local_position: Vector3 = Vector3.ZERO
var seat_local_rotation: Vector3 = Vector3.ZERO
var is_processing_entry: bool = false
var is_processing_exit: bool = false

# ============ PASSENGER VARIABLES ============
@export var passenger_enter_area: Area3D = null
@export var passenger_seat_marker: Marker3D = null
@export var is_passenger_occupied: bool = false
@export var passenger_id: int = -1
var current_passenger: Node3D = null
var passenger_original_transform: Transform3D
var passenger_local_position: Vector3 = Vector3.ZERO
var passenger_local_rotation: Vector3 = Vector3.ZERO
var is_processing_passenger_entry: bool = false

func _ready():
        _setup_input_actions()
        _setup_engine_audio()
        _setup_enter_area()
        _setup_passenger_enter_area()
        
        # Multiplayer setup
        if not is_solo_mode():
                multiplayer.peer_disconnected.connect(_on_peer_disconnected)
        
        initial_visual_rotation = car_visual.rotation_degrees.y
        
        if seat_marker:
                seat_local_position = to_local(seat_marker.global_position)
                seat_local_rotation = seat_marker.rotation
                print("Seat local offset calculated: ", seat_local_position)
                
        if passenger_seat_marker:
                passenger_local_position = to_local(passenger_seat_marker.global_position)
                passenger_local_rotation = passenger_seat_marker.rotation
                print("Passenger seat local offset calculated: ", passenger_local_position)
                
        # Physics setup
        floor_snap_length = 0.3
        floor_stop_on_slope = true
        floor_max_angle = deg_to_rad(46)
        wall_min_slide_angle = deg_to_rad(15)
        floor_constant_speed = true
        floor_block_on_wall = false
        max_slides = 6
        
        current_yaw = rotation.y
        last_position = global_position
        
        if camera:
                camera.current = false
        
        # Start disabled
        set_process_input(false)
        set_physics_process(false)
        Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
        print("Car initialized - disabled | Multiplayer: ", not is_solo_mode())

func is_solo_mode() -> bool:
        # Check if we're in solo mode by looking for players
        var players = get_tree().get_nodes_in_group("player")
        if players.size() > 0:
                return players[0].is_solo_mode if players[0].has_method("is_solo_mode") else true
        return true

func _on_peer_disconnected(peer_id: int):
        # Handle driver disconnection
        if driver_id == peer_id:
                print("Driver disconnected! Resetting driver state.")
                is_driver_occupied = false
                current_driver = null
                driver_id = -1
                
                # Reset car controls
                set_process_input(false)
                set_physics_process(false)
                _stop_all_audio()
                
                # Show enter area
                if enter_area:
                        enter_area.visible = true
                        enter_area.monitoring = true
                        enter_area.monitorable = true
        
        # Handle passenger disconnection
        if passenger_id == peer_id:
                print("Passenger disconnected! Resetting passenger state.")
                is_passenger_occupied = false
                current_passenger = null
                passenger_id = -1
                
                # Show passenger enter area
                if passenger_enter_area:
                        passenger_enter_area.visible = true
                        passenger_enter_area.monitoring = true
                        passenger_enter_area.monitorable = true

func _setup_engine_audio():
        if car1_sound and car2_sound:
                car1_sound.finished.connect(_on_car1_finished)
                car2_sound.finished.connect(_on_car2_finished)
                
                # Configure audio for better spatial sound
                car1_sound.max_distance = 50.0
                car1_sound.unit_size = 8.0
                car2_sound.max_distance = 50.0
                car2_sound.unit_size = 8.0
                
                print("Car audio ready")

func _on_car1_finished():
        is_car1_playing = false
        if abs(current_speed) > 0.1:
                car2_sound.play()

func _on_car2_finished():
        if abs(current_speed) > 0.1 and not is_car1_playing:
                car2_sound.play()

func _setup_input_actions():
        var actions = {
                "move_forward": KEY_W,
                "move_left": KEY_A,
                "move_backward": KEY_S,
                "move_right": KEY_D,
                "door_open": KEY_F,
                "handbrake": KEY_SPACE,
                "toggle_mouse": KEY_M,
                "exit_vehicle": KEY_P,
                "map": KEY_N
        }
        for action_name in actions.keys():
                if not InputMap.has_action(action_name):
                        InputMap.add_action(action_name)
                        var event = InputEventKey.new()
                        event.keycode = actions[action_name]
                        InputMap.action_add_event(action_name, event)

func _input(event: InputEvent):
        if event is InputEventMouseMotion and mouse_locked:
                camera_rotation.x -= event.relative.y * mouse_sensitivity
                camera_rotation.y -= event.relative.x * mouse_sensitivity
                camera_rotation.x = clamp(camera_rotation.x, -PI/2, PI/2)
                                                        
        if event is InputEventKey and event.keycode == KEY_M and event.pressed:
                mouse_locked = !mouse_locked
                if mouse_locked:
                        Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
                else:
                        Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
        
        if event.is_action_pressed("exit_vehicle") and not is_processing_exit:
                if is_driver_occupied:
                        start_exit_sequence()
                elif is_passenger_occupied and current_passenger and current_passenger.is_multiplayer_authority():
                        # Passenger exit
                        current_passenger._exit_as_passenger()

func _physics_process(delta: float):
        if is_processing_entry or is_processing_exit:
                return
        
        if not is_on_floor():
                velocity.y -= custom_gravity * delta
        else:
                if velocity.y < 0:
                        velocity.y = 0
        
        var current_position = global_position
        actual_speed = (current_position - last_position).length() / delta
        last_position = current_position
        
        is_actually_moving = actual_speed > 1.0
        is_handbrake = Input.is_action_pressed("handbrake")

        if is_handbrake:
                target_speed = 0.0
                current_speed = move_toward(current_speed, 0.0, handbrake_deceleration * delta)
        else:
                var forward_pressed = Input.is_action_pressed("move_backward")
                var backward_pressed = Input.is_action_pressed("move_forward")
                if forward_pressed:
                        target_speed = speed
                elif backward_pressed:
                        target_speed = -speed
                else:
                        target_speed = 0.0
                if abs(target_speed) > 0.01:
                        current_speed = move_toward(current_speed, target_speed, acceleration * delta)
                else:
                        current_speed = move_toward(current_speed, 0.0, deceleration * delta)

        if is_actually_moving and abs(current_speed) > 1.0:
                var turn_input = 0.0
                if Input.is_action_pressed("move_left"):
                        turn_input += 1.0
                if Input.is_action_pressed("move_right"):
                        turn_input -= 1.0
                if Input.is_action_pressed("move_backward"):
                        turn_input = -turn_input
                if abs(turn_input) > 0.01:
                        var speed_factor = abs(current_speed) / speed
                        var effective_rotation_speed = max_rotation_speed * speed_factor
                        current_yaw += turn_input * effective_rotation_speed * delta

        _update_turn_animation()

        if Input.is_action_just_pressed("door_open"):
                play_car_animation_synced("DoorOpen", 1.0, 1.0)

        _apply_movement()
        move_and_slide()
        _align_with_floor(delta)
        _update_camera()
        _update_engine_audio()
        _update_driver_position()
        _update_passenger_position()

func _update_driver_position():
        if is_driver_occupied and current_driver and seat_marker:
                var car_basis = global_transform.basis
                var visual_rotation_basis = Basis(Vector3.UP, deg_to_rad(car_visual.rotation_degrees.y))
                var combined_basis = visual_rotation_basis * car_basis
                var seat_world_position = global_transform.origin + combined_basis * seat_local_position
                var seat_local_basis = Basis.from_euler(seat_local_rotation)
                var final_basis = combined_basis * seat_local_basis
                var seat_world_rotation = final_basis.get_euler()
                
                current_driver.global_position = seat_world_position
                current_driver.global_rotation = seat_world_rotation
                
                if current_driver._body:
                        current_driver._body.rotation = Vector3.ZERO

func _update_passenger_position():
        if is_passenger_occupied and current_passenger and passenger_seat_marker:
                var car_basis = global_transform.basis
                var visual_rotation_basis = Basis(Vector3.UP, deg_to_rad(car_visual.rotation_degrees.y))
                var combined_basis = visual_rotation_basis * car_basis
                var seat_world_position = global_transform.origin + combined_basis * passenger_local_position
                var seat_local_basis = Basis.from_euler(passenger_local_rotation)
                var final_basis = combined_basis * seat_local_basis
                var seat_world_rotation = final_basis.get_euler()
                
                current_passenger.global_position = seat_world_position
                current_passenger.global_rotation = seat_world_rotation
                
                if current_passenger._body:
                        current_passenger._body.rotation = Vector3.ZERO

func _update_engine_audio():
        if not car1_sound or not car2_sound:
                return
        
        var is_moving = abs(current_speed) > 0.1
        var speed_ratio = clamp(abs(current_speed) / speed, 0.0, 1.0)
        var target_pitch = lerp(min_pitch, max_pitch, speed_ratio)
        
        # Apply pitch to both sounds
        car1_sound.pitch_scale = 1
        car2_sound.pitch_scale = 1
        
        if is_moving:
                if not was_moving:
                        # Just started moving - play engine sound
                        is_car1_playing = true
                        if car1_sound.stream:
                                car1_sound.play()
                elif not car1_sound.playing and not car2_sound.playing:
                        # Ensure one of the sounds is always playing when moving
                        is_car1_playing = true
                        if car1_sound.stream:
                                car1_sound.play()
        else:
                if was_moving:
                        # Just stopped moving
                        _stop_all_audio()
        
        was_moving = is_moving

func _stop_all_audio():
        if car1_sound and car1_sound.playing:
                car1_sound.stop()
        if car2_sound and car2_sound.playing:
                car2_sound.stop()
        is_car1_playing = false
        was_moving = false

func _update_turn_animation():
        var left_pressed = Input.is_action_pressed("move_left")
        var right_pressed = Input.is_action_pressed("move_right")
        var forward_pressed = Input.is_action_pressed("move_backward")
        var backward_pressed = Input.is_action_pressed("move_forward")
        var should_turn = (forward_pressed or backward_pressed) and (left_pressed or right_pressed) and is_actually_moving

        if forward_pressed:
                target_turn_angle = 0.0
                is_turning = false
        elif should_turn:
                if right_pressed:
                        target_turn_angle = -turn_angle
                        is_turning = true
                elif left_pressed:
                        target_turn_angle = turn_angle
                        is_turning = true
        else:
                target_turn_angle = 0.0
                is_turning = false

        current_turn_angle = lerp(current_turn_angle, target_turn_angle, turn_speed * get_physics_process_delta_time())
        car_visual.rotation_degrees.y = initial_visual_rotation + current_turn_angle

        if animation_player:
                if should_turn:
                        if right_pressed:
                                play_car_animation_synced("Right", 4.0, 1.0)
                        elif left_pressed:
                                play_car_animation_synced("Left", 4.0, 1.0)
                elif abs(current_speed) > 0.1:
                        if not is_turning:
                                play_car_animation_synced("Drive", 4.0, -sign(current_speed))
                elif not (forward_pressed or backward_pressed) and animation_player.current_animation != "DoorOpen":
                        play_car_animation_synced("Idle", 1.0, 1.0)

func _apply_movement():
        var direction = Vector3(sin(current_yaw), 0, cos(current_yaw)).normalized()
        var horizontal_velocity = direction * current_speed
        velocity.x = horizontal_velocity.x
        velocity.z = horizontal_velocity.z

func _align_with_floor(delta: float):
        if not is_on_floor():
                last_floor_normal = last_floor_normal.lerp(Vector3.UP, 5.0 * delta)
        else:
                var space_state = get_world_3d().direct_space_state
                var query = PhysicsRayQueryParameters3D.create(
                        global_position + Vector3(0, 0.5, 0),
                        global_position + Vector3.DOWN * 2.0
                )
                query.exclude = [self]
                var result = space_state.intersect_ray(query)
                if result:
                        last_floor_normal = last_floor_normal.lerp(result.normal, 15.0 * delta)

        var target_basis = Basis()
        target_basis.y = last_floor_normal
        var forward_flat = Vector3(sin(current_yaw), 0, cos(current_yaw))
        var forward_on_slope = forward_flat - last_floor_normal * forward_flat.dot(last_floor_normal)
        forward_on_slope = forward_on_slope.normalized()
        target_basis.z = forward_on_slope
        target_basis.x = target_basis.y.cross(target_basis.z).normalized()
        target_basis.z = target_basis.x.cross(target_basis.y).normalized()
        target_basis = target_basis.orthonormalized()
        transform.basis = transform.basis.slerp(target_basis, alignment_speed * delta)

func _update_camera():
        if camera:
                camera.transform.basis = Basis()
                camera.rotation.x = camera_rotation.x
                camera.rotation.y = camera_rotation.y

func _setup_enter_area():
        if enter_area:
                enter_area.body_entered.connect(_on_enter_area_body_entered)
                enter_area.body_exited.connect(_on_enter_area_body_exited)
                print("Enter area setup complete")
                        
func _on_enter_area_body_entered(body: Node3D):
        if is_driver_occupied or is_processing_entry or is_processing_exit:
                return
        if body.is_in_group("player"):
                body.nearby_car = self
                print("Car: Player ", body.name, " entered DRIVER area")

func _on_enter_area_body_exited(body: Node3D):
        if body.is_in_group("player"):
                if body.nearby_car == self:
                        body.nearby_car = null
                print("Car: Player ", body.name, " left DRIVER area")

# ============ DRIVER ENTRY SEQUENCE ============

func start_entry_sequence(player: Node3D):
        if is_driver_occupied or is_processing_entry or is_processing_exit:
                print("Car is already occupied or processing!")
                return
        
        is_processing_entry = true
        print("=== DRIVER ENTRY SEQUENCE STARTED ===")
        
        _entry_step1_save_transform(player)
        await get_tree().create_timer(0.1).timeout
        
        _entry_step2_teleport_to_seat(player)
        await get_tree().create_timer(0.1).timeout
        
        _entry_step3_play_animation(player)
        await get_tree().create_timer(0.2).timeout
        
        _entry_step4_hide_enter_area()
        
        _entry_step5_enable_car(player)
        
        is_processing_entry = false
        print("=== DRIVER ENTRY SEQUENCE COMPLETE ===")

func _entry_step1_save_transform(player: Node3D):
        driver_original_transform = player.global_transform
        print("Entry Step 1: Saved player original transform")
        if not is_solo_mode():
                sync_entry_step1.rpc(player.get_multiplayer_authority(), driver_original_transform)

@rpc("any_peer", "call_local", "reliable")
func sync_entry_step1(player_id: int, original_transform: Transform3D):
        driver_original_transform = original_transform

func _entry_step2_teleport_to_seat(player: Node3D):
        if not seat_marker:
                print("ERROR: No seat marker!")
                return
        var seat_world_position = global_transform.origin + global_transform.basis * seat_local_position
        var seat_world_rotation = global_rotation + seat_local_rotation
        player.global_position = seat_world_position
        player.global_rotation = seat_world_rotation
        print("Entry Step 2: Player teleported to seat")
        if not is_solo_mode():
                sync_entry_step2.rpc(player.get_multiplayer_authority(), seat_world_position, seat_world_rotation)

@rpc("any_peer", "call_local", "reliable")
func sync_entry_step2(player_id: int, world_pos: Vector3, world_rot: Vector3):
        var players = get_tree().get_nodes_in_group("player")
        for player in players:
                if player.get_multiplayer_authority() == player_id:
                        player.global_position = world_pos
                        player.global_rotation = world_rot
                        break

func _entry_step3_play_animation(player: Node3D):
        if player._body:
                player._body.is_in_car = true
        if player._body and player._body.animation_player:
                if player._body.animation_player.has_animation("CarTP"):
                        player._body.animation_player.play("CarTP")
        print("Entry Step 3: Playing CarTP animation")
        if not is_solo_mode():
                sync_entry_step3.rpc(player.get_multiplayer_authority())

@rpc("any_peer", "call_local", "reliable")
func sync_entry_step3(player_id: int):
        var players = get_tree().get_nodes_in_group("player")
        for player in players:
                if player.get_multiplayer_authority() == player_id:
                        if player._body:
                                player._body.is_in_car = true
                        if player._body and player._body.animation_player:
                                if player._body.animation_player.has_animation("CarTP"):
                                        player._body.animation_player.play("CarTP")
                        break

func _entry_step4_hide_enter_area():
        if enter_area:
                enter_area.visible = false
                enter_area.monitoring = false
                enter_area.monitorable = false
        is_driver_occupied = true
        print("Entry Step 4: Enter area hidden")
        if not is_solo_mode():
                sync_entry_step4.rpc()

@rpc("any_peer", "call_local", "reliable")
func sync_entry_step4():
        if enter_area:
                enter_area.visible = false
                enter_area.monitoring = false
                enter_area.monitorable = false
        is_driver_occupied = true

func _entry_step5_enable_car(player: Node3D):
        current_driver = player
        is_driver_occupied = true
        driver_id = player.get_multiplayer_authority()
        
        if not is_solo_mode():
                set_multiplayer_authority(driver_id)
        
        set_process_input(true)
        set_physics_process(true)
        mouse_locked = true
        Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
        if camera:
                camera.current = true
        print("Entry Step 5: Car enabled - Authority: ", driver_id)
        if not is_solo_mode():
                sync_entry_step5.rpc(driver_id)

@rpc("any_peer", "call_local", "reliable")
func sync_entry_step5(new_driver_id: int):
        var players = get_tree().get_nodes_in_group("player")
        for player in players:
                if player.get_multiplayer_authority() == new_driver_id:
                        current_driver = player
                        driver_id = new_driver_id
                        is_driver_occupied = true
                        break

# ============ PASSENGER ENTRY SEQUENCE ============

func _setup_passenger_enter_area():
        if passenger_enter_area:
                passenger_enter_area.body_entered.connect(_on_passenger_area_body_entered)
                passenger_enter_area.body_exited.connect(_on_passenger_area_body_exited)
                print("Passenger enter area setup complete")

func _on_passenger_area_body_entered(body: Node3D):
        if is_passenger_occupied or is_processing_passenger_entry:
                return
        if body.is_in_group("player"):
                body.nearby_car_passenger = self
                print("Car: Player ", body.name, " entered PASSENGER area")

func _on_passenger_area_body_exited(body: Node3D):
        if body.is_in_group("player"):
                if body.nearby_car_passenger == self:
                        body.nearby_car_passenger = null
                print("Car: Player ", body.name, " left PASSENGER area")

func start_passenger_entry_sequence(player: Node3D):
        if is_passenger_occupied or is_processing_passenger_entry:
                print("Passenger seat already occupied!")
                return
        
        is_processing_passenger_entry = true
        print("=== PASSENGER ENTRY SEQUENCE STARTED ===")
        
        passenger_original_transform = player.global_transform
        
        if passenger_seat_marker:
                var seat_world_position = global_transform.origin + global_transform.basis * passenger_local_position
                var seat_world_rotation = global_rotation + passenger_local_rotation
                player.global_position = seat_world_position
                player.global_rotation = seat_world_rotation
        
        if player._body:
                player._body.is_in_car = true
        
        current_passenger = player
        is_passenger_occupied = true
        passenger_id = player.get_multiplayer_authority()
        
        if passenger_enter_area:
                passenger_enter_area.visible = false
                passenger_enter_area.monitoring = false
                passenger_enter_area.monitorable = false
        
        is_processing_passenger_entry = false
        print("=== PASSENGER ENTRY SEQUENCE COMPLETE ===")

# ============ EXIT SEQUENCES ============

func start_exit_sequence():
        if not is_processing_exit and is_driver_occupied and current_driver:
                is_processing_exit = true
                print("=== DRIVER EXIT SEQUENCE STARTED ===")
                
                _exit_step1_disable_car()
                await get_tree().create_timer(0.1).timeout
                
                _exit_step2_teleport_and_restore()
                await get_tree().create_timer(0.2).timeout
                
                _exit_step3_show_enter_area()
                
                current_driver = null
                is_driver_occupied = false
                is_processing_exit = false
                print("=== DRIVER EXIT SEQUENCE COMPLETE ===")

func _exit_step1_disable_car():
        set_process_input(false)
        set_physics_process(false)
        mouse_locked = false
        Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
        if camera:
                camera.current = false
        print("Exit Step 1: Car disabled")
        if not is_solo_mode():
                sync_exit_step1.rpc()

@rpc("any_peer", "call_local", "reliable")
func sync_exit_step1():
        set_process_input(false)
        set_physics_process(false)
        mouse_locked = false
        Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
        if camera:
                camera.current = false

func _exit_step2_teleport_and_restore():
        if current_driver and driver_original_transform:
                current_driver.global_transform = driver_original_transform
                if current_driver._body:
                        current_driver._body.is_in_car = false
                if current_driver._body:
                        current_driver._body.rotation = Vector3.ZERO
                
                print("Exit Step 2: Camera switched, player teleported and rotation restored")
                if not is_solo_mode():
                        sync_exit_step2.rpc(driver_original_transform)

@rpc("any_peer", "call_local", "reliable")
func sync_exit_step2(original_transform: Transform3D):
        var players = get_tree().get_nodes_in_group("player")
        for player in players:
                if player.get_multiplayer_authority() == player.get_multiplayer_authority():
                        player.global_transform = original_transform
                        if player._body:
                                player._body.is_in_car = false
                        if player._body:
                                player._body.rotation = Vector3.ZERO
                        break

func _exit_step3_show_enter_area():
        if enter_area:
                enter_area.visible = true
                enter_area.monitoring = true
                enter_area.monitorable = true
        is_driver_occupied = false
        print("Exit Step 3: Enter area shown")
        if not is_solo_mode():
                sync_exit_step3.rpc()

@rpc("any_peer", "call_local", "reliable")
func sync_exit_step3():
        if enter_area:
                enter_area.visible = true
                enter_area.monitoring = true
                enter_area.monitorable = true
        is_driver_occupied = false

# ============ PASSENGER EXIT ============

func _exit_as_passenger():
        if is_passenger_occupied and current_passenger:
                is_passenger_occupied = false
                if passenger_original_transform:
                        current_passenger.global_transform = passenger_original_transform
                if current_passenger._body:
                        current_passenger._body.is_in_car = false
                current_passenger = null
                
                if passenger_enter_area:
                        passenger_enter_area.visible = true
                        passenger_enter_area.monitoring = true
                        passenger_enter_area.monitorable = true
                print("Passenger exit complete")

# ============ ANIMATION FUNCTIONS ============

func play_car_animation_synced(anim_name: String, speed: float = 1.0, direction: float = 1.0):
        _play_animation_local(anim_name, speed, direction)
        if not is_solo_mode():
                sync_car_animation.rpc(anim_name, speed, direction)

func _play_animation_local(anim_name: String, speed: float, direction: float):
        if animation_player and animation_player.has_animation(anim_name):
                animation_player.play(anim_name, -1, speed * direction)

@rpc("any_peer", "call_remote", "reliable")
func sync_car_animation(anim_name: String, speed: float, direction: float):
        _play_animation_local(anim_name, speed, direction)

func stop_car_animation_synced():
        if animation_player:
                animation_player.stop()
        if not is_solo_mode():
                sync_stop_car_animation.rpc()

@rpc("any_peer", "call_remote", "reliable")
func sync_stop_car_animation():
        if animation_player:
                animation_player.stop()

# ============ FALLBACK AUDIO SYSTEM ============

func _play_fallback_engine_sound():
        # Fallback method to play engine sound using direct audio playback
        if not car1_sound or not car2_sound:
                return
        
        # Ensure we have streams
        if not car1_sound.stream and fallback_car1_stream:
                car1_sound.stream = fallback_car1_stream
        if not car2_sound.stream and fallback_car2_stream:
                car2_sound.stream = fallback_car2_stream
        
        # If still no streams, try to create a simple fallback
        if not car1_sound.stream:
                _create_simple_fallback_sound(car1_sound)
        if not car2_sound.stream:
                _create_simple_fallback_sound(car2_sound)

func _create_simple_fallback_sound(audio_player: AudioStreamPlayer3D):
        # Create a simple engine-like sound programmatically as last resort
        var noise = AudioStreamGenerator.new()
        noise.mix_rate = 44100
        audio_player.stream = noise
        print("Created fallback audio stream for car")

# ============ UTILITY FUNCTIONS ============

func _process(_delta):
        # Update passenger position in process for smoother movement
        if is_passenger_occupied and current_passenger and passenger_seat_marker:
                _update_passenger_position()
`;
function getVehicleTemplate(type) {
  const code = CAR_TEMPLATE;
  const variables = parseVariables3(code);
  const functions = parseFunctions3(code);
  return {
    name: type,
    code,
    variables,
    functions,
    description: "Full-featured car with multiplayer/solo support, driver+passenger seats, animations, physics, and audio"
  };
}
function parseVariables3(code) {
  const variables = [];
  const exportRegex = /@export var (\w+): (\w+(?:<[^>]+>)?) = ([^\n]+)/g;
  let match;
  while ((match = exportRegex.exec(code)) !== null) {
    variables.push({
      name: match[1],
      type: match[2],
      value: match[3].trim()
    });
  }
  return variables;
}
function parseFunctions3(code) {
  const functions = [];
  const funcRegex = /func (_?\w+)\([^)]*\)[^:]*:/g;
  let match;
  const seen = /* @__PURE__ */ new Set();
  while ((match = funcRegex.exec(code)) !== null) {
    const funcName = match[1];
    if (!seen.has(funcName)) {
      functions.push({
        name: funcName,
        signature: match[0].slice(0, -1)
      });
      seen.add(funcName);
    }
  }
  return functions;
}
function applyVarsToTemplate2(template, customVars) {
  let code = template.code;
  for (const variable of template.variables) {
    if (customVars[variable.name] !== void 0) {
      const oldValue = `@export var ${variable.name}: ${variable.type} = ${variable.value}`;
      const newValue = `@export var ${variable.name}: ${variable.type} = ${customVars[variable.name]}`;
      code = code.replace(oldValue, newValue);
    }
  }
  return code;
}
function selectiveFunctions2(template, selectedFunctions) {
  let code = template.code;
  const allFunctions = template.functions;
  for (const func of allFunctions) {
    if (!selectedFunctions.has(func.name)) {
      const funcRegex = new RegExp(
        `func ${func.name}\\([^)]*\\)[^:]*:.*?(?=func|$)`,
        "s"
      );
      code = code.replace(funcRegex, "");
    }
  }
  return code;
}

// server/vehicle-ai-generator.ts
var genaiModule2 = __toESM(require("@google/genai"), 1);
var geminiApiKey2 = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
var groqApiKey3 = process.env.GROQ_API_KEY;
async function generateVehicleAIScript(baseCode, selectedFunctions, enhancementPrompt) {
  try {
    if (geminiApiKey2) {
      return await generateWithGemini3(baseCode, selectedFunctions, enhancementPrompt);
    } else if (groqApiKey3) {
      return await generateWithGroq3(baseCode, selectedFunctions, enhancementPrompt);
    } else {
      console.warn("No AI API keys available, returning base code");
      return baseCode;
    }
  } catch (error) {
    console.error("Error generating vehicle AI script:", error);
    return baseCode;
  }
}
async function generateWithGemini3(baseCode, selectedFunctions, enhancementPrompt) {
  const genAI = new genaiModule2.GoogleGenerativeAI(geminiApiKey2);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `You are a GDScript expert. Enhance this car/vehicle script:

Original Code:
\`\`\`gdscript
${baseCode}
\`\`\`

Selected Functions to Keep: ${selectedFunctions.join(", ")}

${enhancementPrompt ? `Enhancement Request: ${enhancementPrompt}` : ""}

Requirements:
1. Keep ONLY the selected functions from the list
2. Maintain all @export variables
3. Remove unused functions
4. Keep the class structure intact
5. Maintain multiplayer/solo mode support
6. Ensure the code is 100% working GDScript
7. ${enhancementPrompt ? `Apply this enhancement: ${enhancementPrompt}` : "Keep the original behavior"}

Return ONLY valid GDScript code without explanation.`;
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  const cleanCode = response.replace(/```gdscript\n?/g, "").replace(/```\n?/g, "").trim();
  return cleanCode;
}
async function generateWithGroq3(baseCode, selectedFunctions, enhancementPrompt) {
  const axios = (await import("axios")).default;
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "user",
          content: `You are a GDScript expert. Enhance this car/vehicle script:

Original Code:
\`\`\`gdscript
${baseCode}
\`\`\`

Selected Functions to Keep: ${selectedFunctions.join(", ")}

${enhancementPrompt ? `Enhancement Request: ${enhancementPrompt}` : ""}

Requirements:
1. Keep ONLY the selected functions from the list
2. Maintain all @export variables
3. Remove unused functions
4. Keep the class structure intact
5. Maintain multiplayer/solo mode support
6. Ensure the code is 100% working GDScript
7. ${enhancementPrompt ? `Apply this enhancement: ${enhancementPrompt}` : "Keep the original behavior"}

Return ONLY valid GDScript code without explanation.`
        }
      ],
      temperature: 0.3,
      max_tokens: 2e3
    },
    {
      headers: {
        Authorization: `Bearer ${groqApiKey3}`
      }
    }
  );
  const content = response.data.choices[0].message.content;
  const cleanCode = content.replace(/```gdscript\n?/g, "").replace(/```\n?/g, "").trim();
  return cleanCode;
}

// server/scene-ai-generator.ts
var import_genai2 = require("@google/genai");

// server/scene-tscn-builder.ts
function generateTSCN(sceneStructure) {
  const lines = [];
  lines.push('[gd_scene load_steps=2 format=3 uid="uid://scene_auto_generated"]');
  lines.push('[ext_resource type="Script" path="res://main.gd"]');
  lines.push("");
  lines.push(`[node name="${sceneStructure.name}" type="${sceneStructure.type}"]`);
  if (sceneStructure.properties) {
    Object.entries(sceneStructure.properties).forEach(([key, value]) => {
      lines.push(`${key} = ${formatValue(value)}`);
    });
  }
  lines.push("");
  if (sceneStructure.children && sceneStructure.children.length > 0) {
    addChildNodes(lines, sceneStructure.children, "");
  }
  return lines.join("\n");
}
function addChildNodes(lines, children, parentPath) {
  children.forEach((child) => {
    lines.push(`[node name="${child.name}" type="${child.type}" parent="${parentPath || "."}"]`);
    if (child.properties) {
      Object.entries(child.properties).forEach(([key, value]) => {
        lines.push(`${key} = ${formatValue(value)}`);
      });
    }
    lines.push("");
    if (child.children && child.children.length > 0) {
      const newPath = parentPath ? `${parentPath}/${child.name}` : child.name;
      addChildNodes(lines, child.children, newPath);
    }
  });
}
function formatValue(value) {
  if (value === "true" || value === "false") return value;
  if (!isNaN(parseFloat(value))) return value;
  if (value.startsWith("Vector2") || value.startsWith("Vector3") || value.startsWith("Color")) return value;
  if (value.startsWith("res://")) return `"${value}"`;
  return `"${value}"`;
}
function parseSceneCode(code) {
  const lines = code.trim().split("\n").filter((l) => l.trim());
  const root = {
    name: "Scene",
    type: "Node2D",
    children: []
  };
  let currentLevel = root;
  const stack = [root];
  lines.forEach((line) => {
    const indent = line.search(/\S/);
    const trimmed = line.trim();
    const match = trimmed.match(/^([\w]+)\s*(?:\(([\w]+)\))?/);
    if (!match) return;
    const [, nodeName, nodeType] = match;
    const newNode = {
      name: nodeName,
      type: nodeType || "Node",
      children: []
    };
    while (stack.length > 1 && indent <= (stack.length - 2) * 2) {
      stack.pop();
    }
    const parent = stack[stack.length - 1];
    if (!parent.children) parent.children = [];
    parent.children.push(newNode);
    if (indent > 0) {
      stack.push(newNode);
    }
  });
  return root;
}

// server/scene-ai-generator.ts
var geminiApiKey3 = process.env.GEMINI_API_KEY || process.env.AI_INTEGRATIONS_GEMINI_API_KEY;
var gemini = geminiApiKey3 ? new import_genai2.GoogleGenAI({ apiKey: geminiApiKey3 }) : null;
var groqApiKey4 = process.env.GROQ_API_KEY;
var SCENE_JSON_PROMPT = `Convert the following scene description into a valid JSON structure for Godot TSCN file generation.

Requirements:
- Root node must be Node2D, Node3D, Control, or CanvasLayer
- Each node must have: name (string), type (string), properties (object, optional)
- Properties should use proper Godot types: Vector2(x,y), Vector3(x,y,z), Color names, resource paths
- Common node types: Sprite2D, Node2D, CollisionShape2D, AnimationPlayer, Camera2D, CharacterBody2D, Area2D, RigidBody2D, Control, Label, TextureRect
- Return ONLY valid JSON in this format:
{
  "name": "SceneName",
  "type": "Node2D",
  "properties": { "position": "Vector2(0, 0)" },
  "children": [
    { "name": "Child1", "type": "Sprite2D", "properties": {...}, "children": [...] }
  ]
}

Scene description:
`;
async function generateSceneWithAI(sceneCode) {
  try {
    if (gemini) {
      try {
        console.log("\u{1F4E1} Using Gemini for scene generation...");
        const response = await gemini.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: SCENE_JSON_PROMPT + sceneCode }]
            }
          ]
        });
        const text = response.text || "";
        console.log("\u2705 Gemini response received");
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const sceneStructure2 = JSON.parse(jsonMatch[0]);
            const tscnCode = generateTSCN(sceneStructure2);
            console.log("\u2705 Scene structure parsed and TSCN generated");
            return tscnCode;
          } catch (parseError) {
            console.warn("\u26A0\uFE0F Failed to parse JSON:", parseError.message);
          }
        } else {
          console.warn("\u26A0\uFE0F No JSON found in Gemini response");
        }
      } catch (geminiError) {
        console.warn("\u26A0\uFE0F Gemini failed:", geminiError.message);
      }
    }
    if (groqApiKey4) {
      try {
        console.log("\u{1F4E1} Using Groq for scene generation...");
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey4}`
          },
          body: JSON.stringify({
            model: "mixtral-8x7b-32768",
            messages: [
              {
                role: "user",
                content: SCENE_JSON_PROMPT + sceneCode
              }
            ],
            max_tokens: 1e3
          })
        });
        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          const text = data.choices[0].message.content;
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const sceneStructure2 = JSON.parse(jsonMatch[0]);
            const tscnCode = generateTSCN(sceneStructure2);
            console.log("\u2705 Groq scene generated");
            return tscnCode;
          }
        }
      } catch (groqError) {
        console.warn("\u26A0\uFE0F Groq failed:", groqError.message);
      }
    }
    console.log("\u2699\uFE0F Using fallback parser (no AI available)");
    const sceneStructure = parseSceneCode(sceneCode);
    return generateTSCN(sceneStructure);
  } catch (error) {
    console.error("Scene AI generation failed:", error);
    throw error;
  }
}
async function generateSceneFromImageWithAI(imageBuffer) {
  try {
    if (gemini) {
      try {
        console.log("\u{1F4E1} Using Gemini for image scene generation...");
        const base64Image = imageBuffer.toString("base64");
        const response = await gemini.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [
                {
                  inlineData: {
                    mimeType: "image/png",
                    data: base64Image
                  }
                },
                {
                  text: `Analyze this game scene diagram and generate a Godot TSCN scene structure JSON.

${SCENE_JSON_PROMPT}`
                }
              ]
            }
          ]
        });
        const text = response.text || "";
        console.log("\u2705 Gemini image analysis response received");
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const sceneStructure = JSON.parse(jsonMatch[0]);
            const tscnCode = generateTSCN(sceneStructure);
            console.log("\u2705 Image scene structure parsed and TSCN generated");
            return tscnCode;
          } catch (parseError) {
            console.warn("\u26A0\uFE0F Failed to parse image JSON:", parseError.message);
          }
        } else {
          console.warn("\u26A0\uFE0F No JSON found in Gemini image response");
        }
      } catch (geminiError) {
        console.warn("\u26A0\uFE0F Gemini image analysis failed:", geminiError.message);
      }
    }
    console.log("\u2699\uFE0F Image processing not available, generating intelligent default scene");
    const defaultScene = {
      name: "GameScene",
      type: "Node2D",
      properties: {
        script: "res://scene.gd"
      },
      children: [
        {
          name: "Player",
          type: "CharacterBody2D",
          properties: {
            position: "Vector2(512, 300)"
          },
          children: [
            {
              name: "Sprite2D",
              type: "Sprite2D",
              properties: {
                texture: "res://assets/player.png"
              }
            },
            {
              name: "CollisionShape2D",
              type: "CollisionShape2D"
            }
          ]
        },
        {
          name: "AnimationPlayer",
          type: "AnimationPlayer"
        },
        {
          name: "Camera2D",
          type: "Camera2D",
          properties: {
            "zoom": "Vector2(1, 1)"
          }
        }
      ]
    };
    return generateTSCN(defaultScene);
  } catch (error) {
    console.error("Scene image AI generation failed:", error);
    throw error;
  }
}

// server/scene-generator.ts
async function generateSceneFromCode(sceneCode) {
  try {
    console.log("\u{1F916} Generating scene with AI...");
    const tscnCode = await generateSceneWithAI(sceneCode);
    return tscnCode;
  } catch (error) {
    console.error("Scene generation from code failed:", error);
    throw new Error("Failed to generate scene from code");
  }
}
async function generateSceneFromImage(imageBuffer) {
  try {
    console.log("\u{1F916} Generating scene from image with AI...");
    const tscnCode = await generateSceneFromImageWithAI(imageBuffer);
    return tscnCode;
  } catch (error) {
    console.error("Scene generation from image failed:", error);
    throw new Error("Failed to generate scene from image");
  }
}
async function generateScene(sceneCode, imageBuffer) {
  if (sceneCode && sceneCode.trim()) {
    return generateSceneFromCode(sceneCode);
  } else if (imageBuffer) {
    return generateSceneFromImage(imageBuffer);
  } else {
    throw new Error("No scene data provided");
  }
}

// server/templates-library.ts
var TEMPLATES_LIBRARY = {
  player_movement: {
    name: "Player Movement",
    category: "Player Systems",
    description: "Full player controller with movement, crouch, prone, jumping, health, and weapon systems",
    file: "champ.gd",
    size: "~15KB"
  },
  player_animation: {
    name: "Player Animation",
    category: "Animation",
    description: "Animation state machine with idle, walk, run, jump, crouch, prone, and combat states",
    file: "action.gd",
    size: "~6KB"
  },
  audio_manager: {
    name: "Audio Manager",
    category: "Audio",
    description: "Global audio management with BGM player, SFX mixing, and volume control (Autoload singleton)",
    file: "AudioManager.gd",
    size: "~2KB"
  },
  lobby_system: {
    name: "Multiplayer Lobby",
    category: "Multiplayer",
    description: "Lobby with player spawning, chat, kill feed, game start, and victory detection",
    file: "lobby.gd",
    size: "~20KB"
  },
  minimap: {
    name: "Minimap Creator",
    category: "UI",
    description: "Dynamic minimap with player tracking, layer management, and fullmap view toggle (N key)",
    file: "minimap.gd",
    size: "~8KB"
  },
  network: {
    name: "Network System",
    category: "Networking",
    description: "Multiplayer networking with peer-to-peer connections, player registration, and disconnect handling",
    file: "network.gd",
    size: "~3KB"
  },
  pvp_combat: {
    name: "PvP Combat System",
    category: "Combat",
    description: "Complete PvP combat with weapons (gun/melee), aiming, firing, health, and collision management",
    file: "pvp.gd",
    size: "~18KB"
  },
  safe_zone: {
    name: "Battle Royale Zone",
    category: "Game Mode",
    description: "Shrinking safe zone system with damage progression, zone announcements, and player exclusion",
    file: "SafeZone.gd",
    size: "~18KB"
  },
  spring_arm_camera: {
    name: "Mouse Camera",
    category: "Camera",
    description: "Spring arm camera controller with smooth mouse look and rotation sensitivity (0.005)",
    file: "spring_arm_offset.gd",
    size: "~1KB"
  },
  auth_scene: {
    name: "Authentication Scene",
    category: "Authentication",
    description: "Complete login/registration UI with Supabase integration and email validation",
    file: "auth_scene.gd",
    size: "~5KB"
  },
  game_manager: {
    name: "Game Manager",
    category: "Game Management",
    description: "Central game state management with local storage and player data persistence",
    file: "GameManager.gd",
    size: "~4KB"
  },
  lobby_scene: {
    name: "Lobby Scene",
    category: "Multiplayer",
    description: "Player lobby with character spawning, player info display, and game mode selection",
    file: "LobbyScene.gd",
    size: "~3KB"
  },
  mpchat: {
    name: "Multiplayer Chat",
    category: "Multiplayer",
    description: "Real-time chat system for multiplayer games using RPC synchronization",
    file: "mpchat.gd",
    size: "~1KB"
  },
  topmap: {
    name: "Top-Down Minimap",
    category: "UI",
    description: "Dynamic minimap with player tracking, layer management, and camera positioning",
    file: "topmap.gd",
    size: "~4KB"
  },
  main_menu: {
    name: "Main Menu Scene",
    category: "UI",
    description: "Interactive main menu with about button, play/exit options, character rotation, double-tap detection, and animations",
    file: "main_menu.gd",
    size: "~5KB"
  },
  loading_screen: {
    name: "Loading Screen",
    category: "UI",
    description: "Animated loading bar with progress percentage display and automatic scene transition",
    file: "start.gd",
    size: "~2KB"
  },
  victory_scene: {
    name: "Victory Scene",
    category: "Game Mode",
    description: "Victory screen with looping animations, replay option, and main menu return",
    file: "victory_scene.gd",
    size: "~3KB"
  },
  death_scene: {
    name: "Death/Game Over Scene",
    category: "Game Mode",
    description: "Game over screen with sub-viewport sync, restart option, and menu navigation",
    file: "death.gd",
    size: "~1KB"
  }
};
function getTemplatesList() {
  return Object.entries(TEMPLATES_LIBRARY).map(([key, template]) => ({
    id: key,
    ...template
  }));
}
function getAllCategories() {
  const categories = /* @__PURE__ */ new Set();
  Object.values(TEMPLATES_LIBRARY).forEach((t) => categories.add(t.category));
  return Array.from(categories).sort();
}

// server/godot-nodes-database.ts
var GODOT_NODES_DATABASE = [
  // 3D NODES (40 nodes)
  { id: "node3d", name: "Node3D", inherits: "Node", category: "3D", description: "Base 3D spatial node", icon: "Cube", color: "#06b6d4", properties: [{ name: "position", type: "Vector3", default: "0,0,0", description: "Local position" }, { name: "rotation", type: "Vector3", default: "0,0,0", description: "Euler angles rotation" }, { name: "scale", type: "Vector3", default: "1,1,1", description: "Local scale" }, { name: "visible", type: "bool", default: "true", description: "Visibility" }], signals: [{ name: "visibility_changed", params: [] }], methods: [{ name: "look_at", params: ["target: Vector3", "up: Vector3"], returnType: "void", description: "Rotate to face target" }], example: "position = Vector3(10, 5, 0)" },
  {
    id: "characterbody3d",
    name: "CharacterBody3D",
    inherits: "PhysicsBody3D",
    category: "3D Physics",
    description: "Kinematic character body with collision",
    icon: "Person",
    color: "#ec4899",
    properties: [
      { name: "velocity", type: "Vector3", default: "0,0,0", description: "Current velocity" },
      { name: "motion_mode", type: "MotionMode", default: "GROUNDED", description: "GROUNDED or FLOATING" },
      { name: "up_direction", type: "Vector3", default: "0,1,0", description: "Which direction is up" }
    ],
    signals: [{ name: "velocity_changed", params: [] }],
    methods: [
      { name: "move_and_slide", params: [], returnType: "bool", description: "Apply velocity with collision" },
      { name: "is_on_floor", params: [], returnType: "bool", description: "Check if touching floor" },
      { name: "is_on_wall", params: [], returnType: "bool", description: "Check if touching wall" }
    ],
    example: "velocity = Vector3(10, 0, 0); move_and_slide()"
  },
  {
    id: "rigidbody3d",
    name: "RigidBody3D",
    inherits: "PhysicsBody3D",
    category: "3D Physics",
    description: "Dynamic rigid body with physics simulation",
    icon: "Box",
    color: "#14b8a6",
    properties: [
      { name: "mass", type: "float", default: "1.0", description: "Body mass" },
      { name: "gravity_scale", type: "float", default: "1.0", description: "Gravity multiplier" },
      { name: "linear_velocity", type: "Vector3", default: "0,0,0", description: "Current velocity" }
    ],
    signals: [{ name: "body_entered", params: ["body: Node"] }],
    methods: [
      { name: "apply_force", params: ["force: Vector3"], returnType: "void", description: "Apply continuous force" },
      { name: "apply_impulse", params: ["impulse: Vector3"], returnType: "void", description: "Apply instant impulse" }
    ],
    example: "apply_force(Vector3(100, 0, 0))"
  },
  {
    id: "animationplayer",
    name: "AnimationPlayer",
    inherits: "Node",
    category: "Animation",
    description: "Play and manage animations",
    icon: "Play",
    color: "#a855f7",
    properties: [
      { name: "current_animation", type: "StringName", default: '""', description: "Currently playing animation" },
      { name: "playback_speed", type: "float", default: "1.0", description: "Playback speed multiplier" }
    ],
    signals: [{ name: "animation_finished", params: ["anim_name: StringName"] }],
    methods: [
      { name: "play", params: ["name: StringName", "custom_blend: float", "custom_speed: float"], returnType: "void", description: "Play animation" },
      { name: "stop", params: [], returnType: "void", description: "Stop animation" },
      { name: "is_playing", params: [], returnType: "bool", description: "Check if playing" }
    ],
    example: "animation_player.play('run')"
  },
  {
    id: "camera3d",
    name: "Camera3D",
    inherits: "Node3D",
    category: "3D",
    description: "3D camera for rendering",
    icon: "Camera",
    color: "#8b5cf6",
    properties: [
      { name: "fov", type: "float", default: "75.0", description: "Field of view in degrees" },
      { name: "far", type: "float", default: "4000.0", description: "Far clipping plane" },
      { name: "near", type: "float", default: "0.05", description: "Near clipping plane" }
    ],
    signals: [{ name: "fov_changed", params: [] }],
    methods: [
      { name: "make_current", params: [], returnType: "void", description: "Set as active camera" },
      { name: "is_current", params: [], returnType: "bool", description: "Check if active camera" }
    ],
    example: "camera.make_current()"
  },
  {
    id: "collisionshape3d",
    name: "CollisionShape3D",
    inherits: "Node3D",
    category: "3D Physics",
    description: "Define collision shape",
    icon: "Box",
    color: "#f97316",
    properties: [
      { name: "shape", type: "Shape3D", default: "null", description: "Collision shape resource" },
      { name: "disabled", type: "bool", default: "false", description: "Disable collision" }
    ],
    signals: [],
    methods: [],
    example: "collision_shape.shape = BoxShape3D.new()"
  },
  {
    id: "meshinstance3d",
    name: "MeshInstance3D",
    inherits: "GeometryInstance3D",
    category: "3D",
    description: "Display mesh geometry",
    icon: "Grid",
    color: "#06b6d4",
    properties: [
      { name: "mesh", type: "Mesh", default: "null", description: "Mesh resource" },
      { name: "material_override", type: "Material", default: "null", description: "Override material" }
    ],
    signals: [],
    methods: [
      { name: "create_trimesh_collision", params: [], returnType: "void", description: "Create collision from mesh" }
    ],
    example: "mesh_instance.mesh = BoxMesh.new()"
  },
  {
    id: "sprite3d",
    name: "Sprite3D",
    inherits: "SpriteBase3D",
    category: "3D",
    description: "2D sprite in 3D space",
    icon: "Image",
    color: "#ec4899",
    properties: [
      { name: "texture", type: "Texture2D", default: "null", description: "Sprite texture" },
      { name: "hframes", type: "int", default: "1", description: "Horizontal frames" },
      { name: "vframes", type: "int", default: "1", description: "Vertical frames" }
    ],
    signals: [],
    methods: [
      { name: "set_frame", params: ["frame: int"], returnType: "void", description: "Set current frame" }
    ],
    example: "sprite_3d.texture = preload('res://sprite.png')"
  },
  {
    id: "audiostreamplayer3d",
    name: "AudioStreamPlayer3D",
    inherits: "Node3D",
    category: "Audio",
    description: "3D positional audio player",
    icon: "Volume",
    color: "#f59e0b",
    properties: [
      { name: "stream", type: "AudioStream", default: "null", description: "Audio to play" },
      { name: "volume_db", type: "float", default: "0.0", description: "Volume in decibels" },
      { name: "pitch_scale", type: "float", default: "1.0", description: "Pitch multiplier" }
    ],
    signals: [{ name: "finished", params: [] }],
    methods: [
      { name: "play", params: ["from_position: float"], returnType: "void", description: "Start playback" },
      { name: "stop", params: [], returnType: "void", description: "Stop playback" }
    ],
    example: "audio_player.stream = preload('res://sound.ogg'); audio_player.play()"
  },
  {
    id: "area3d",
    name: "Area3D",
    inherits: "CollisionObject3D",
    category: "3D Physics",
    description: "Trigger volume for collision detection",
    icon: "Target",
    color: "#f97316",
    properties: [
      { name: "gravity_override_mode", type: "GravityMode", default: "DISABLE", description: "Gravity override" }
    ],
    signals: [
      { name: "body_entered", params: ["body: Node"] },
      { name: "body_exited", params: ["body: Node"] },
      { name: "area_entered", params: ["area: Area3D"] }
    ],
    methods: [
      { name: "get_overlapping_bodies", params: [], returnType: "Array", description: "Get bodies in area" },
      { name: "get_overlapping_areas", params: [], returnType: "Array", description: "Get areas overlapping" }
    ],
    example: "area.body_entered.connect(_on_body_entered)"
  },
  // UI NODES (30 nodes)
  {
    id: "control",
    name: "Control",
    inherits: "CanvasItem",
    category: "UI",
    description: "Base UI control node",
    icon: "Layers",
    color: "#3b82f6",
    properties: [
      { name: "size", type: "Vector2", default: "0,0", description: "Control size" },
      { name: "position", type: "Vector2", default: "0,0", description: "Control position" },
      { name: "visible", type: "bool", default: "true", description: "Visibility" }
    ],
    signals: [{ name: "gui_input", params: ["event: InputEvent"] }],
    methods: [
      { name: "get_rect", params: [], returnType: "Rect2", description: "Get control rectangle" },
      { name: "is_mouse_over", params: [], returnType: "bool", description: "Check mouse over" }
    ],
    example: "control.size = Vector2(100, 50)"
  },
  {
    id: "button",
    name: "Button",
    inherits: "BaseButton",
    category: "UI",
    description: "Clickable button",
    icon: "Square",
    color: "#3b82f6",
    properties: [
      { name: "text", type: "String", default: '""', description: "Button text" },
      { name: "icon", type: "Texture2D", default: "null", description: "Button icon" }
    ],
    signals: [{ name: "pressed", params: [] }],
    methods: [],
    example: "button.text = 'Click Me'; button.pressed.connect(_on_pressed)"
  },
  {
    id: "label",
    name: "Label",
    inherits: "Control",
    category: "UI",
    description: "Display text",
    icon: "Type",
    color: "#3b82f6",
    properties: [
      { name: "text", type: "String", default: '""', description: "Label text" },
      { name: "horizontal_alignment", type: "HAlignment", default: "LEFT", description: "Text alignment" }
    ],
    signals: [],
    methods: [],
    example: "label.text = 'Health: ' + str(health)"
  },
  {
    id: "texturebutton",
    name: "TextureButton",
    inherits: "BaseButton",
    category: "UI",
    description: "Button with texture",
    icon: "Image",
    color: "#3b82f6",
    properties: [
      { name: "texture_normal", type: "Texture2D", default: "null", description: "Normal texture" },
      { name: "texture_pressed", type: "Texture2D", default: "null", description: "Pressed texture" }
    ],
    signals: [{ name: "pressed", params: [] }],
    methods: [],
    example: "texture_button.texture_normal = preload('res://button.png')"
  },
  {
    id: "vboxcontainer",
    name: "VBoxContainer",
    inherits: "BoxContainer",
    category: "UI",
    description: "Vertical layout container",
    icon: "AlignVertical",
    color: "#3b82f6",
    properties: [
      { name: "alignment", type: "Alignment", default: "BEGIN", description: "Child alignment" }
    ],
    signals: [],
    methods: [],
    example: "vbox.add_child(label)"
  },
  {
    id: "hboxcontainer",
    name: "HBoxContainer",
    inherits: "BoxContainer",
    category: "UI",
    description: "Horizontal layout container",
    icon: "AlignHorizontal",
    color: "#3b82f6",
    properties: [
      { name: "alignment", type: "Alignment", default: "BEGIN", description: "Child alignment" }
    ],
    signals: [],
    methods: [],
    example: "hbox.add_child(button)"
  },
  // ANIMATION NODES (10 nodes)
  {
    id: "tween",
    name: "Tween",
    inherits: "RefCounted",
    category: "Animation",
    description: "Smooth animation over time",
    icon: "ArrowRight",
    color: "#8b5cf6",
    properties: [],
    signals: [{ name: "finished", params: [] }],
    methods: [
      { name: "tween_property", params: ["object: Object", "property: String", "final_val: Any", "duration: float"], returnType: "TweenPropertyKey", description: "Animate property" },
      { name: "tween_callback", params: ["callable: Callable"], returnType: "TweenCallback", description: "Call function" },
      { name: "set_parallel", params: ["parallel: bool"], returnType: "Tween", description: "Run parallel animations" }
    ],
    example: "tween.tween_property(node, 'position', Vector3(10,0,0), 1.0)"
  },
  // TIMER NODE
  {
    id: "timer",
    name: "Timer",
    inherits: "Node",
    category: "Timing",
    description: "Trigger events after delay",
    icon: "Clock",
    color: "#f59e0b",
    properties: [
      { name: "wait_time", type: "float", default: "1.0", description: "Time between timeouts" },
      { name: "one_shot", type: "bool", default: "false", description: "Fire once then stop" },
      { name: "paused", type: "bool", default: "false", description: "Pause timer" }
    ],
    signals: [{ name: "timeout", params: [] }],
    methods: [
      { name: "start", params: ["time_sec: float"], returnType: "void", description: "Start timer" },
      { name: "stop", params: [], returnType: "void", description: "Stop timer" },
      { name: "is_stopped", params: [], returnType: "bool", description: "Check if stopped" }
    ],
    example: "timer.wait_time = 2.0; timer.timeout.connect(_on_timeout); timer.start()"
  },
  // INPUT NODES (8 nodes)
  {
    id: "input",
    name: "Input",
    inherits: "Object",
    category: "Input",
    description: "Global input singleton",
    icon: "Keyboard",
    color: "#3b82f6",
    properties: [],
    signals: [],
    methods: [
      { name: "is_action_pressed", params: ["action: StringName"], returnType: "bool", description: "Check if action pressed" },
      { name: "is_action_just_pressed", params: ["action: StringName"], returnType: "bool", description: "Check if just pressed" },
      { name: "get_vector", params: ["negative_x: StringName", "positive_x: StringName", "negative_y: StringName", "positive_y: StringName"], returnType: "Vector2", description: "Get input vector" }
    ],
    example: "if Input.is_action_pressed('ui_right'): move_right()"
  },
  // RESOURCE NODES (15 nodes)
  {
    id: "resource",
    name: "Resource",
    inherits: "RefCounted",
    category: "Resource",
    description: "Base resource class",
    icon: "File",
    color: "#64748b",
    properties: [
      { name: "resource_path", type: "String", default: '""', description: "Resource file path" }
    ],
    signals: [{ name: "changed", params: [] }],
    methods: [],
    example: "var res = Resource.new()"
  },
  {
    id: "scene",
    name: "Scene",
    inherits: "Resource",
    category: "Resource",
    description: "Scene file resource",
    icon: "Layout",
    color: "#10b981",
    properties: [],
    signals: [],
    methods: [],
    example: "var scene = preload('res://scene.tscn'); add_child(scene.instantiate())"
  },
  {
    id: "audiostream",
    name: "AudioStream",
    inherits: "Resource",
    category: "Audio",
    description: "Audio file resource",
    icon: "Volume",
    color: "#f59e0b",
    properties: [
      { name: "length", type: "float", default: "0.0", description: "Audio length in seconds" }
    ],
    signals: [],
    methods: [],
    example: "var audio = preload('res://sound.ogg')"
  },
  {
    id: "texture2d",
    name: "Texture2D",
    inherits: "Resource",
    category: "Resource",
    description: "2D image texture",
    icon: "Image",
    color: "#8b5cf6",
    properties: [
      { name: "size", type: "Vector2i", default: "0,0", description: "Texture dimensions" }
    ],
    signals: [],
    methods: [],
    example: "var texture = preload('res://image.png')"
  },
  // UTILITY NODES (20 nodes)
  {
    id: "node",
    name: "Node",
    inherits: "Object",
    category: "Core",
    description: "Base scene tree node",
    icon: "Circle",
    color: "#6b7280",
    properties: [
      { name: "name", type: "StringName", default: '"Node"', description: "Node name" },
      { name: "owner", type: "Node", default: "null", description: "Scene owner" }
    ],
    signals: [
      { name: "tree_entered", params: [] },
      { name: "child_entered_tree", params: ["node: Node"] }
    ],
    methods: [
      { name: "add_child", params: ["node: Node", "force_readable_name: bool"], returnType: "void", description: "Add child node" },
      { name: "get_children", params: [], returnType: "Array", description: "Get all children" },
      { name: "queue_free", params: [], returnType: "void", description: "Delete node at frame end" }
    ],
    example: "add_child(new_node); queue_free()"
  },
  {
    id: "deltatime",
    name: "Delta Time",
    inherits: "Global",
    category: "Core",
    description: "Frame time delta (use get_process_delta_time())",
    icon: "Zap",
    color: "#f59e0b",
    properties: [],
    signals: [],
    methods: [],
    example: "position += velocity * get_process_delta_time()"
  },
  { id: "transform3d", name: "Transform3D", inherits: "Node3D", category: "3D", description: "Coordinate transformation", icon: "Cube", color: "#06b6d4", properties: [{ name: "origin", type: "Vector3", default: "0,0,0", description: "Position" }, { name: "basis", type: "Basis", default: "identity", description: "Rotation and scale" }], signals: [], methods: [], example: "transform.origin = Vector3(10, 5, 0)" },
  { id: "vector2", name: "Vector2", inherits: "BuiltIn", category: "Core", description: "2D vector type", icon: "Circle", color: "#6b7280", properties: [{ name: "x", type: "float", default: "0.0", description: "X component" }, { name: "y", type: "float", default: "0.0", description: "Y component" }], signals: [], methods: [], example: "var v = Vector2(10, 20)" },
  { id: "vector3", name: "Vector3", inherits: "BuiltIn", category: "Core", description: "3D vector type", icon: "Cube", color: "#6b7280", properties: [{ name: "x", type: "float", default: "0.0", description: "X" }, { name: "y", type: "float", default: "0.0", description: "Y" }, { name: "z", type: "float", default: "0.0", description: "Z" }], signals: [], methods: [], example: "var v = Vector3(10, 20, 30)" },
  { id: "color", name: "Color", inherits: "BuiltIn", category: "Core", description: "RGBA color", icon: "Palette", color: "#8b5cf6", properties: [{ name: "r", type: "float", default: "1.0", description: "Red" }], signals: [], methods: [], example: "var c = Color.RED" },
  { id: "parallaxbackground", name: "ParallaxBackground", inherits: "CanvasLayer", category: "2D", description: "Parallax scrolling background", icon: "Layers", color: "#06b6d4", properties: [{ name: "scroll_offset", type: "Vector2", default: "0,0", description: "Scroll offset" }], signals: [], methods: [], example: "parallax_bg.scroll_offset = Vector2(10, 0)" },
  { id: "tilemap", name: "TileMap", inherits: "Node2D", category: "2D", description: "Tile-based map", icon: "Grid", color: "#10b981", properties: [{ name: "tile_set", type: "TileSet", default: "null", description: "TileSet resource" }], signals: [], methods: [{ name: "set_cell", params: ["layer", "coords", "source_id", "atlas_coords"], returnType: "void", description: "Place a tile" }], example: "tilemap.set_cell(0, Vector2i(5, 5), 0, Vector2i(0, 0))" },
  { id: "sprite2d", name: "Sprite2D", inherits: "Node2D", category: "2D", description: "2D sprite node", icon: "Image", color: "#ec4899", properties: [{ name: "texture", type: "Texture2D", default: "null", description: "Sprite texture" }, { name: "offset", type: "Vector2", default: "0,0", description: "Draw offset" }], signals: [], methods: [], example: "sprite.texture = preload('res://sprite.png')" },
  { id: "staticbody3d", name: "StaticBody3D", inherits: "PhysicsBody3D", category: "3D Physics", description: "Static physics body", icon: "Box", color: "#14b8a6", properties: [], signals: [], methods: [], example: "static_body.position = Vector3(0, 0, 0)" },
  { id: "audioplaystream2d", name: "AudioStreamPlayer2D", inherits: "Node2D", category: "Audio", description: "2D positional audio", icon: "Volume", color: "#f59e0b", properties: [{ name: "stream", type: "AudioStream", default: "null", description: "Audio to play" }], signals: [{ name: "finished", params: [] }], methods: [{ name: "play", params: [], returnType: "void", description: "Play audio" }], example: "audio2d.play()" },
  { id: "rect2d", name: "Rect2D", inherits: "BuiltIn", category: "Core", description: "2D rectangle", icon: "Square", color: "#6b7280", properties: [{ name: "position", type: "Vector2", default: "0,0", description: "Top-left" }, { name: "size", type: "Vector2", default: "0,0", description: "Width and height" }], signals: [], methods: [], example: "var rect = Rect2(Vector2(0, 0), Vector2(100, 100))" },
  { id: "physicsmaterial3d", name: "PhysicsMaterial3D", inherits: "Resource", category: "Physics", description: "3D physics material", icon: "Layers", color: "#14b8a6", properties: [{ name: "friction", type: "float", default: "0.5", description: "Friction coefficient" }, { name: "bounce", type: "float", default: "0.0", description: "Bounciness" }], signals: [], methods: [], example: "body.physics_material = PhysicsMaterial3D.new()" },
  { id: "capsuleshape3d", name: "CapsuleShape3D", inherits: "Shape3D", category: "Physics", description: "Capsule collision shape", icon: "Cylinder", color: "#f97316", properties: [{ name: "radius", type: "float", default: "1.0", description: "Capsule radius" }, { name: "height", type: "float", default: "2.0", description: "Capsule height" }], signals: [], methods: [], example: "capsule.radius = 0.5" },
  { id: "sphereshape3d", name: "SphereShape3D", inherits: "Shape3D", category: "Physics", description: "Sphere collision shape", icon: "Sphere", color: "#f97316", properties: [{ name: "radius", type: "float", default: "1.0", description: "Sphere radius" }], signals: [], methods: [], example: "sphere.radius = 2.0" },
  { id: "cylindershape3d", name: "CylinderShape3D", inherits: "Shape3D", category: "Physics", description: "Cylinder collision shape", icon: "Cylinder", color: "#f97316", properties: [{ name: "radius", type: "float", default: "1.0", description: "Radius" }, { name: "height", type: "float", default: "2.0", description: "Height" }], signals: [], methods: [], example: "cylinder.radius = 1.5" },
  { id: "containercontrol", name: "Container", inherits: "Control", category: "UI", description: "Base container for layout", icon: "Layers", color: "#3b82f6", properties: [{ name: "sort_children_by_name", type: "bool", default: "false", description: "Sort children" }], signals: [], methods: [], example: "container.sort_children_by_name = true" },
  { id: "gridcontainer", name: "GridContainer", inherits: "Container", category: "UI", description: "Grid layout container", icon: "Grid", color: "#3b82f6", properties: [{ name: "columns", type: "int", default: "1", description: "Number of columns" }], signals: [], methods: [], example: "grid.columns = 3" },
  { id: "aspectratiocontainer", name: "AspectRatioContainer", inherits: "Container", category: "UI", description: "Maintain aspect ratio", icon: "Square", color: "#3b82f6", properties: [{ name: "ratio", type: "float", default: "1.0", description: "Aspect ratio" }], signals: [], methods: [], example: "aspect.ratio = 16.0/9.0" },
  { id: "lineedit", name: "LineEdit", inherits: "Control", category: "UI", description: "Single line text input", icon: "Type", color: "#3b82f6", properties: [{ name: "text", type: "String", default: '""', description: "Text content" }, { name: "placeholder_text", type: "String", default: '""', description: "Placeholder text" }], signals: [{ name: "text_changed", params: ["new_text: String"] }], methods: [], example: "line_edit.placeholder_text = 'Enter name'" },
  { id: "textedit", name: "TextEdit", inherits: "Control", category: "UI", description: "Multi-line text editor", icon: "FileText", color: "#3b82f6", properties: [{ name: "text", type: "String", default: '""', description: "Text content" }], signals: [{ name: "text_changed", params: [] }], methods: [], example: "text_edit.text = 'Hello\\nWorld'" },
  { id: "spinbox", name: "SpinBox", inherits: "Range", category: "UI", description: "Number input spinner", icon: "Plus", color: "#3b82f6", properties: [{ name: "min_value", type: "float", default: "0.0", description: "Minimum value" }, { name: "max_value", type: "float", default: "100.0", description: "Maximum value" }], signals: [], methods: [], example: "spinbox.value = 50" },
  { id: "hslider", name: "HSlider", inherits: "Range", category: "UI", description: "Horizontal slider", icon: "Slider", color: "#3b82f6", properties: [{ name: "min_value", type: "float", default: "0.0", description: "Minimum" }, { name: "max_value", type: "float", default: "100.0", description: "Maximum" }, { name: "value", type: "float", default: "0.0", description: "Current value" }], signals: [{ name: "value_changed", params: ["value: float"] }], methods: [], example: "slider.value = 25" },
  { id: "vslider", name: "VSlider", inherits: "Range", category: "UI", description: "Vertical slider", icon: "Slider", color: "#3b82f6", properties: [{ name: "value", type: "float", default: "0.0", description: "Current value" }], signals: [], methods: [], example: "vslider.value = 75" },
  { id: "checkbox", name: "CheckBox", inherits: "Button", category: "UI", description: "Checkbox input", icon: "CheckSquare", color: "#3b82f6", properties: [{ name: "button_pressed", type: "bool", default: "false", description: "Checked state" }], signals: [{ name: "toggled", params: ["button_pressed: bool"] }], methods: [], example: "checkbox.button_pressed = true" },
  { id: "itemlist", name: "ItemList", inherits: "Control", category: "UI", description: "List of selectable items", icon: "List", color: "#3b82f6", properties: [{ name: "select_mode", type: "SelectMode", default: "SINGLE", description: "Selection mode" }], signals: [{ name: "item_selected", params: ["index: int"] }], methods: [{ name: "add_item", params: ["text: String"], returnType: "void", description: "Add item" }], example: "item_list.add_item('Option 1')" },
  { id: "treeitem", name: "TreeItem", inherits: "Object", category: "UI", description: "Tree item node", icon: "TreeNode", color: "#3b82f6", properties: [{ name: "text", type: "String", default: '""', description: "Item text" }], signals: [], methods: [], example: "tree_item.set_text(0, 'Root')" },
  { id: "tree", name: "Tree", inherits: "Control", category: "UI", description: "Hierarchical item list", icon: "TreeNode", color: "#3b82f6", properties: [{ name: "hide_root", type: "bool", default: "false", description: "Hide root" }], signals: [{ name: "item_selected", params: [] }], methods: [{ name: "create_item", params: [], returnType: "TreeItem", description: "Create tree item" }], example: "var root = tree.create_item()" },
  { id: "popupmenu", name: "PopupMenu", inherits: "Popup", category: "UI", description: "Popup menu", icon: "Menu", color: "#3b82f6", properties: [], signals: [{ name: "id_pressed", params: ["id: int"] }], methods: [{ name: "add_item", params: ["label: String"], returnType: "void", description: "Add menu item" }], example: "popup.add_item('Save')" },
  { id: "menubutton", name: "MenuButton", inherits: "Button", category: "UI", description: "Button with dropdown menu", icon: "Menu", color: "#3b82f6", properties: [], signals: [], methods: [{ name: "get_popup", params: [], returnType: "PopupMenu", description: "Get popup menu" }], example: "menu_btn.get_popup().add_item('New')" },
  { id: "dialnode", name: "DialNode", inherits: "Control", category: "UI", description: "Dial/circular selector", icon: "Radio", color: "#3b82f6", properties: [{ name: "value", type: "float", default: "0.0", description: "Current angle" }], signals: [], methods: [], example: "dial.value = 90" },
  { id: "basematerial3d", name: "BaseMaterial3D", inherits: "Material", category: "3D", description: "Base material for 3D", icon: "Cube", color: "#8b5cf6", properties: [{ name: "albedo_color", type: "Color", default: "white", description: "Base color" }, { name: "roughness", type: "float", default: "1.0", description: "Surface roughness" }], signals: [], methods: [], example: "mat.albedo_color = Color.RED" },
  { id: "standardmaterial3d", name: "StandardMaterial3D", inherits: "BaseMaterial3D", category: "3D", description: "Standard 3D material", icon: "Cube", color: "#8b5cf6", properties: [{ name: "metallic", type: "float", default: "0.0", description: "Metallic value" }], signals: [], methods: [], example: "mat.metallic = 0.5" },
  { id: "ormaterial3d", name: "ORMMaterial3D", inherits: "BaseMaterial3D", category: "3D", description: "ORM material (metallic/roughness)", icon: "Cube", color: "#8b5cf6", properties: [], signals: [], methods: [], example: "var orm = ORMMaterial3D.new()" },
  // Additional 3D Nodes
  { id: "meshinstance3d", name: "MeshInstance3D", inherits: "Node3D", category: "3D", description: "3D mesh display", icon: "Cube", color: "#06b6d4", properties: [{ name: "mesh", type: "Mesh", default: "null", description: "Mesh resource" }], signals: [], methods: [], example: "mesh_instance.mesh = BoxMesh.new()" },
  { id: "light3d", name: "Light3D", inherits: "Node3D", category: "3D", description: "Base light node", icon: "Lightbulb", color: "#fbbf24", properties: [{ name: "light_energy", type: "float", default: "1.0", description: "Light intensity" }, { name: "light_color", type: "Color", default: "white", description: "Light color" }], signals: [], methods: [], example: "light.light_energy = 2.0" },
  { id: "omnilight3d", name: "OmniLight3D", inherits: "Light3D", category: "3D", description: "Omni-directional light", icon: "Lightbulb", color: "#fbbf24", properties: [{ name: "omni_range", type: "float", default: "5.0", description: "Light radius" }], signals: [], methods: [], example: "light.omni_range = 10.0" },
  { id: "spotlight3d", name: "SpotLight3D", inherits: "Light3D", category: "3D", description: "Spotlight node", icon: "Lightbulb", color: "#fbbf24", properties: [{ name: "spot_range", type: "float", default: "5.0", description: "Spotlight range" }, { name: "spot_angle", type: "float", default: "45.0", description: "Spotlight angle" }], signals: [], methods: [], example: "light.spot_angle = 60.0" },
  { id: "directionallight3d", name: "DirectionalLight3D", inherits: "Light3D", category: "3D", description: "Directional light (sun)", icon: "Sun", color: "#fbbf24", properties: [{ name: "light_energy", type: "float", default: "1.0", description: "Brightness" }], signals: [], methods: [], example: "light.light_energy = 1.5" },
  { id: "rigidbody3d", name: "RigidBody3D", inherits: "PhysicsBody3D", category: "3D Physics", description: "3D rigid body physics", icon: "Box", color: "#ec4899", properties: [{ name: "mass", type: "float", default: "1.0", description: "Object mass" }, { name: "linear_velocity", type: "Vector3", default: "0,0,0", description: "Velocity" }, { name: "angular_velocity", type: "Vector3", default: "0,0,0", description: "Rotation speed" }], signals: [{ name: "body_entered", params: ["body: PhysicsBody3D"] }], methods: [{ name: "apply_central_force", params: ["force: Vector3"], returnType: "void", description: "Apply force to center" }], example: "body.apply_central_force(Vector3(10, 0, 0))" },
  { id: "area3d", name: "Area3D", inherits: "Node3D", category: "3D Physics", description: "3D area trigger", icon: "Circle", color: "#10b981", properties: [{ name: "gravity_scale", type: "float", default: "1.0", description: "Gravity multiplier" }], signals: [{ name: "area_entered", params: ["area: Area3D"] }, { name: "body_entered", params: ["body: PhysicsBody3D"] }], methods: [], example: "signal body_detected(body)" },
  { id: "camera3d", name: "Camera3D", inherits: "Node3D", category: "3D", description: "3D camera node", icon: "Camera", color: "#8b5cf6", properties: [{ name: "fov", type: "float", default: "75.0", description: "Field of view" }, { name: "near", type: "float", default: "0.1", description: "Near plane" }, { name: "far", type: "float", default: "4000.0", description: "Far plane" }], signals: [], methods: [{ name: "make_current", params: [], returnType: "void", description: "Set as main camera" }], example: "camera.make_current()" },
  { id: "marker3d", name: "Marker3D", inherits: "Node3D", category: "3D", description: "3D marker/position reference", icon: "MapPin", color: "#6b7280", properties: [], signals: [], methods: [], example: "marker.position = Vector3(5, 0, 0)" },
  { id: "control", name: "Control", inherits: "Node", category: "UI", description: "Base UI node", icon: "Square", color: "#3b82f6", properties: [{ name: "rect_position", type: "Vector2", default: "0,0", description: "Position" }, { name: "rect_size", type: "Vector2", default: "100,100", description: "Size" }, { name: "anchor_left", type: "float", default: "0.0", description: "Left anchor" }], signals: [], methods: [{ name: "get_rect", params: [], returnType: "Rect2", description: "Get control rectangle" }], example: "control.rect_position = Vector2(10, 10)" },
  { id: "boxcontainer", name: "BoxContainer", inherits: "Container", category: "UI", description: "Base container for layout", icon: "Layers", color: "#3b82f6", properties: [{ name: "alignment", type: "Alignment", default: "BEGIN", description: "Child alignment" }], signals: [], methods: [], example: "container.alignment = BoxContainer.ALIGNMENT_CENTER" },
  { id: "node2d", name: "Node2D", inherits: "Node", category: "2D", description: "Base 2D node", icon: "Circle", color: "#10b981", properties: [{ name: "position", type: "Vector2", default: "0,0", description: "Local position" }, { name: "rotation", type: "float", default: "0.0", description: "Rotation in radians" }, { name: "scale", type: "Vector2", default: "1,1", description: "Local scale" }], signals: [], methods: [], example: "position = Vector2(100, 50)" },
  { id: "sprite2dbase", name: "Sprite2D", inherits: "Node2D", category: "2D", description: "2D sprite display", icon: "Image", color: "#ec4899", properties: [{ name: "texture", type: "Texture2D", default: "null", description: "Texture" }, { name: "offset", type: "Vector2", default: "0,0", description: "Offset" }, { name: "centered", type: "bool", default: "true", description: "Center origin" }], signals: [], methods: [], example: "sprite.texture = preload('res://sprite.png')" },
  { id: "animatedsprite2d", name: "AnimatedSprite2D", inherits: "Node2D", category: "2D", description: "Animated 2D sprite", icon: "Film", color: "#ec4899", properties: [{ name: "sprite_frames", type: "SpriteFrames", default: "null", description: "Animation frames" }, { name: "animation", type: "StringName", default: '"default"', description: "Current animation" }, { name: "playing", type: "bool", default: "false", description: "Is playing" }], signals: [{ name: "animation_finished", params: [] }], methods: [{ name: "play", params: ["anim: StringName"], returnType: "void", description: "Play animation" }], example: "sprite.play('run')" },
  { id: "area2d", name: "Area2D", inherits: "Node2D", category: "2D Physics", description: "2D area trigger", icon: "Circle", color: "#10b981", properties: [], signals: [{ name: "area_entered", params: ["area: Area2D"] }, { name: "body_entered", params: ["body: PhysicsBody2D"] }], methods: [], example: "area.area_entered.connect(_on_area_entered)" },
  { id: "physicsbody2d", name: "PhysicsBody2D", inherits: "Node2D", category: "2D Physics", description: "Base 2D physics body", icon: "Box", color: "#14b8a6", properties: [], signals: [], methods: [], example: "var physics_body = PhysicsBody2D.new()" },
  { id: "rigidbody2d", name: "RigidBody2D", inherits: "PhysicsBody2D", category: "2D Physics", description: "2D rigid body", icon: "Box", color: "#ec4899", properties: [{ name: "mass", type: "float", default: "1.0", description: "Mass" }, { name: "linear_velocity", type: "Vector2", default: "0,0", description: "Velocity" }, { name: "angular_velocity", type: "float", default: "0.0", description: "Rotation speed" }], signals: [], methods: [{ name: "apply_central_force", params: ["force: Vector2"], returnType: "void", description: "Apply force" }], example: "body.linear_velocity = Vector2(100, 0)" },
  { id: "characterbody2d", name: "CharacterBody2D", inherits: "PhysicsBody2D", category: "2D Physics", description: "2D character body", icon: "Person", color: "#ec4899", properties: [{ name: "velocity", type: "Vector2", default: "0,0", description: "Movement velocity" }], signals: [], methods: [{ name: "move_and_slide", params: [], returnType: "bool", description: "Apply movement with collision" }], example: "velocity.x = 100; move_and_slide()" },
  { id: "staticbody2d", name: "StaticBody2D", inherits: "PhysicsBody2D", category: "2D Physics", description: "Static 2D body", icon: "Box", color: "#14b8a6", properties: [], signals: [], methods: [], example: "static_body.position = Vector2(0, 0)" },
  { id: "tilemap2d", name: "TileMap2D", inherits: "Node2D", category: "2D", description: "2D tile map", icon: "Grid", color: "#10b981", properties: [{ name: "tile_set", type: "TileSet", default: "null", description: "TileSet resource" }], signals: [], methods: [{ name: "set_cell", params: ["layer", "coords", "source_id"], returnType: "void", description: "Place tile" }], example: "tilemap.set_cell(0, Vector2i(5, 5), 0)" },
  { id: "parallaxlayer", name: "ParallaxLayer", inherits: "Node2D", category: "2D", description: "Parallax scrolling layer", icon: "Layers", color: "#06b6d4", properties: [{ name: "motion_offset", type: "Vector2", default: "0,0", description: "Scroll offset" }], signals: [], methods: [], example: "layer.motion_offset = Vector2(10, 0)" },
  { id: "canvas", name: "CanvasLayer", inherits: "Node", category: "UI", description: "Canvas layer for UI/overlays", icon: "Layers", color: "#3b82f6", properties: [{ name: "layer", type: "int", default: "1", description: "Layer number" }, { name: "offset", type: "Vector2", default: "0,0", description: "Offset" }], signals: [], methods: [], example: "canvas.layer = 2" },
  { id: "panel", name: "Panel", inherits: "Control", category: "UI", description: "UI panel with background", icon: "Square", color: "#3b82f6", properties: [], signals: [], methods: [], example: "panel.modulate = Color(1, 1, 1, 0.5)" },
  { id: "tabcontainer", name: "TabContainer", inherits: "Control", category: "UI", description: "Container with tabs", icon: "Tabs", color: "#3b82f6", properties: [{ name: "current_tab", type: "int", default: "0", description: "Active tab" }], signals: [{ name: "tab_changed", params: ["tab: int"] }], methods: [], example: "tab_container.current_tab = 1" },
  { id: "scrollcontainer", name: "ScrollContainer", inherits: "Container", category: "UI", description: "Scrollable container", icon: "Layers", color: "#3b82f6", properties: [{ name: "scroll_horizontal_enabled", type: "bool", default: "false", description: "Allow horizontal scroll" }], signals: [], methods: [], example: "scroll.scroll_horizontal_enabled = true" },
  { id: "richtext", name: "RichTextLabel", inherits: "Control", category: "UI", description: "Rich formatted text", icon: "Type", color: "#3b82f6", properties: [{ name: "text", type: "String", default: '""', description: "BBCode text" }], signals: [], methods: [{ name: "clear", params: [], returnType: "void", description: "Clear text" }], example: "text_label.text = '[color=red]Error[/color]'" },
  { id: "progressbar", name: "ProgressBar", inherits: "Range", category: "UI", description: "Progress bar display", icon: "Percent", color: "#3b82f6", properties: [{ name: "show_percentage", type: "bool", default: "false", description: "Show % text" }], signals: [], methods: [], example: "progress.value = 50" },
  { id: "textrect", name: "TextureRect", inherits: "Control", category: "UI", description: "Texture display in UI", icon: "Image", color: "#3b82f6", properties: [{ name: "texture", type: "Texture2D", default: "null", description: "Display texture" }, { name: "expand_mode", type: "ExpandMode", default: "IGNORE_SIZE", description: "Size mode" }], signals: [], methods: [], example: "texture_rect.texture = texture" },
  { id: "ninepatch", name: "NinePatchRect", inherits: "Control", category: "UI", description: "9-slice texture scaling", icon: "Square", color: "#3b82f6", properties: [{ name: "texture", type: "Texture2D", default: "null", description: "Texture" }], signals: [], methods: [], example: "ninepatch.texture = preload('res://panel.png')" },
  { id: "colorpicker", name: "ColorPickerButton", inherits: "Button", category: "UI", description: "Color picker button", icon: "Palette", color: "#3b82f6", properties: [{ name: "color", type: "Color", default: "white", description: "Selected color" }], signals: [{ name: "color_changed", params: ["color: Color"] }], methods: [], example: "color_button.color = Color.RED" },
  { id: "filedialog", name: "FileDialog", inherits: "ConfirmationDialog", category: "UI", description: "File selection dialog", icon: "FolderOpen", color: "#3b82f6", properties: [{ name: "filters", type: "PackedStringArray", default: "[]", description: "File filters" }], signals: [{ name: "file_selected", params: ["path: String"] }], methods: [], example: "file_dialog.filters = ['*.gd ; GDScript']" },
  { id: "confirmationdialog", name: "ConfirmationDialog", inherits: "AcceptDialog", category: "UI", description: "Confirmation dialog", icon: "AlertCircle", color: "#3b82f6", properties: [], signals: [], methods: [], example: "dialog.add_cancel_button('No')" },
  { id: "acceptdialog", name: "AcceptDialog", inherits: "Window", category: "UI", description: "Basic dialog", icon: "MessageSquare", color: "#3b82f6", properties: [{ name: "title", type: "String", default: '"Alert"', description: "Dialog title" }], signals: [{ name: "confirmed", params: [] }], methods: [{ name: "show_modal", params: [], returnType: "void", description: "Show as modal" }], example: "dialog.dialog_text = 'Are you sure?'" },
  { id: "optionbutton", name: "OptionButton", inherits: "Button", category: "UI", description: "Dropdown selector", icon: "ChevronDown", color: "#3b82f6", properties: [{ name: "selected", type: "int", default: "-1", description: "Selected index" }], signals: [{ name: "item_selected", params: ["index: int"] }], methods: [{ name: "add_item", params: ["label: String"], returnType: "void", description: "Add option" }], example: "option_button.add_item('Option 1')" },
  { id: "splitcontainer", name: "SplitContainer", inherits: "Container", category: "UI", description: "Split panel container", icon: "Columns", color: "#3b82f6", properties: [{ name: "split_offset", type: "int", default: "0", description: "Divider position" }], signals: [], methods: [], example: "split.split_offset = 200" },
  { id: "vboxcontainerbase", name: "VBoxContainer", inherits: "Container", category: "UI", description: "Vertical layout", icon: "AlignVertical", color: "#3b82f6", properties: [], signals: [], methods: [], example: "vbox.add_child(button)" },
  { id: "hboxcontainerbase", name: "HBoxContainer", inherits: "Container", category: "UI", description: "Horizontal layout", icon: "AlignHorizontal", color: "#3b82f6", properties: [], signals: [], methods: [], example: "hbox.add_child(label)" },
  { id: "canvasgroup", name: "CanvasGroup", inherits: "Node2D", category: "2D", description: "Group 2D nodes for effects", icon: "Layers", color: "#10b981", properties: [], signals: [], methods: [], example: "canvas_group.scale = Vector2(0.5, 0.5)" },
  { id: "cpuparticles2d", name: "CPUParticles2D", inherits: "Node2D", category: "2D", description: "CPU-based particles", icon: "Sparkles", color: "#f59e0b", properties: [{ name: "amount", type: "int", default: "8", description: "Particle count" }, { name: "emitting", type: "bool", default: "false", description: "Is emitting" }], signals: [], methods: [{ name: "restart", params: [], returnType: "void", description: "Restart emission" }], example: "particles.emitting = true" },
  { id: "gpuparticles3d", name: "GPUParticles3D", inherits: "Node3D", category: "3D", description: "GPU particles", icon: "Sparkles", color: "#f59e0b", properties: [{ name: "amount", type: "int", default: "8", description: "Particle count" }, { name: "emitting", type: "bool", default: "false", description: "Is emitting" }], signals: [], methods: [], example: "particles.emitting = true" },
  { id: "shape3d", name: "Shape3D", inherits: "Resource", category: "Physics", description: "3D collision shape", icon: "Cube", color: "#f97316", properties: [], signals: [], methods: [], example: "var shape = BoxShape3D.new()" },
  { id: "boxshape3d", name: "BoxShape3D", inherits: "Shape3D", category: "Physics", description: "Box collision shape", icon: "Box", color: "#f97316", properties: [{ name: "size", type: "Vector3", default: "1,1,1", description: "Box dimensions" }], signals: [], methods: [], example: "shape.size = Vector3(2, 2, 2)" },
  { id: "shape2d", name: "Shape2D", inherits: "Resource", category: "Physics", description: "2D collision shape", icon: "Square", color: "#f97316", properties: [], signals: [], methods: [], example: "var shape = CircleShape2D.new()" },
  { id: "circleshape2d", name: "CircleShape2D", inherits: "Shape2D", category: "Physics", description: "Circle collision", icon: "Circle", color: "#f97316", properties: [{ name: "radius", type: "float", default: "1.0", description: "Radius" }], signals: [], methods: [], example: "shape.radius = 2.0" },
  { id: "rectangleshape2d", name: "RectangleShape2D", inherits: "Shape2D", category: "Physics", description: "Rectangle collision", icon: "Square", color: "#f97316", properties: [{ name: "size", type: "Vector2", default: "1,1", description: "Size" }], signals: [], methods: [], example: "shape.size = Vector2(10, 5)" },
  { id: "collisionshape3d", name: "CollisionShape3D", inherits: "Node3D", category: "3D Physics", description: "3D collision shape holder", icon: "Cube", color: "#14b8a6", properties: [{ name: "shape", type: "Shape3D", default: "null", description: "Shape resource" }, { name: "disabled", type: "bool", default: "false", description: "Disable collision" }], signals: [], methods: [], example: "collision.shape = BoxShape3D.new()" },
  { id: "collisionshape2d", name: "CollisionShape2D", inherits: "Node2D", category: "2D Physics", description: "2D collision shape holder", icon: "Square", color: "#14b8a6", properties: [{ name: "shape", type: "Shape2D", default: "null", description: "Shape resource" }], signals: [], methods: [], example: "collision.shape = CircleShape2D.new()" },
  { id: "viewport", name: "Viewport", inherits: "Node", category: "Core", description: "Render target", icon: "Monitor", color: "#6b7280", properties: [{ name: "size", type: "Vector2i", default: "1024,768", description: "Viewport size" }], signals: [], methods: [], example: "viewport.size = Vector2i(800, 600)" },
  { id: "world3d", name: "World3D", inherits: "Resource", category: "3D", description: "3D physics world", icon: "Cube", color: "#06b6d4", properties: [], signals: [], methods: [], example: "var world = World3D.new()" },
  { id: "world2d", name: "World2D", inherits: "Resource", category: "2D", description: "2D physics world", icon: "Circle", color: "#10b981", properties: [], signals: [], methods: [], example: "var world = World2D.new()" },
  { id: "navigationregion3d", name: "NavigationRegion3D", inherits: "Node3D", category: "3D", description: "3D navigation mesh region", icon: "Map", color: "#06b6d4", properties: [], signals: [], methods: [], example: "nav_region.navigation_mesh = mesh" },
  { id: "navigationregion2d", name: "NavigationRegion2D", inherits: "Node2D", category: "2D", description: "2D navigation mesh region", icon: "Map", color: "#10b981", properties: [], signals: [], methods: [], example: "nav_region.navigation_polygon = polygon" },
  { id: "audiostream", name: "AudioStream", inherits: "Resource", category: "Audio", description: "Audio file resource", icon: "Volume", color: "#f59e0b", properties: [], signals: [], methods: [], example: "var audio = preload('res://sound.ogg')" },
  { id: "audiostreamsample", name: "AudioStreamWAV", inherits: "AudioStream", category: "Audio", description: "WAV audio file", icon: "Volume", color: "#f59e0b", properties: [{ name: "mix_rate", type: "int", default: "44100", description: "Sample rate" }], signals: [], methods: [], example: "audio = preload('res://sample.wav')" },
  { id: "audiostreamplayerbase", name: "AudioStreamPlayer", inherits: "Node", category: "Audio", description: "Global audio player", icon: "Volume", color: "#f59e0b", properties: [{ name: "stream", type: "AudioStream", default: "null", description: "Audio to play" }, { name: "volume_db", type: "float", default: "0.0", description: "Volume in dB" }, { name: "playing", type: "bool", default: "false", description: "Is playing" }], signals: [{ name: "finished", params: [] }], methods: [{ name: "play", params: ["from_position: float"], returnType: "void", description: "Start playback" }, { name: "stop", params: [], returnType: "void", description: "Stop playback" }], example: "audio_player.play()" },
  { id: "audioplaystream3d", name: "AudioStreamPlayer3D", inherits: "Node3D", category: "Audio", description: "3D spatial audio", icon: "Volume", color: "#f59e0b", properties: [{ name: "stream", type: "AudioStream", default: "null", description: "Audio to play" }, { name: "volume_db", type: "float", default: "0.0", description: "Volume" }, { name: "max_distance", type: "float", default: "0.0", description: "Max hear distance" }], signals: [], methods: [{ name: "play", params: ["from_position: float"], returnType: "void", description: "Play sound" }], example: "audio3d.play()" },
  { id: "synthesizer", name: "Synthesizer", inherits: "Node", category: "Audio", description: "Audio synthesis", icon: "Waveform", color: "#f59e0b", properties: [], signals: [], methods: [], example: "var synth = Synthesizer.new()" },
  { id: "shader", name: "Shader", inherits: "Resource", category: "Rendering", description: "Shader code resource", icon: "Code", color: "#8b5cf6", properties: [], signals: [], methods: [], example: "var shader = preload('res://shader.gdshader')" },
  { id: "shadermaterial", name: "ShaderMaterial", inherits: "Material", category: "Rendering", description: "Custom shader material", icon: "Palette", color: "#8b5cf6", properties: [{ name: "shader", type: "Shader", default: "null", description: "Shader" }], signals: [], methods: [], example: "material.shader = preload('res://custom.gdshader')" },
  { id: "decal3d", name: "Decal", inherits: "Node3D", category: "3D", description: "3D surface decal", icon: "Stamp", color: "#06b6d4", properties: [{ name: "albedo_texture", type: "Texture2D", default: "null", description: "Decal texture" }], signals: [], methods: [], example: "decal.albedo_texture = texture" },
  { id: "occluderinstance3d", name: "OccluderInstance3D", inherits: "Node3D", category: "3D", description: "Occlusion culling", icon: "Eye", color: "#06b6d4", properties: [], signals: [], methods: [], example: "var occluder = OccluderInstance3D.new()" },
  { id: "voxelgigvoxel", name: "GPUParticles2D", inherits: "Node2D", category: "2D", description: "GPU 2D particles", icon: "Sparkles", color: "#f59e0b", properties: [{ name: "amount", type: "int", default: "8", description: "Particle count" }], signals: [], methods: [], example: "particles.emitting = true" },
  { id: "basematerial", name: "Material", inherits: "Resource", category: "Rendering", description: "Base material class", icon: "Palette", color: "#8b5cf6", properties: [], signals: [], methods: [], example: "var material = Material.new()" },
  { id: "uniquename", name: "UniqueNameInOwner", inherits: "Node", category: "Utility", description: "Unique name in owner", icon: "Hash", color: "#6b7280", properties: [], signals: [], methods: [], example: "%node_name" },
  { id: "remoteinfosync", name: "RemoteSynchronizer", inherits: "Node", category: "Network", description: "Network synchronization", icon: "Network", color: "#0ea5e9", properties: [], signals: [], methods: [], example: "synchronizer.add_property('position')" },
  { id: "multiplayer", name: "MultiplayerSpawner", inherits: "Node", category: "Network", description: "Spawn networked nodes", icon: "Users", color: "#0ea5e9", properties: [], signals: [], methods: [], example: "spawner.spawn_function = spawn_player" },
  { id: "callbacktweener", name: "Tween", inherits: "RefCounted", category: "Animation", description: "Animation tweening", icon: "Zap", color: "#a855f7", properties: [], signals: [], methods: [{ name: "tween_property", params: ["obj", "property", "final_val", "duration"], returnType: "PropertyTweener", description: "Animate property" }], example: "get_tree().create_tween().tween_property(sprite, 'position', Vector2(100, 100), 1.0)" },
  { id: "animationplayer", name: "AnimationPlayer", inherits: "Node", category: "Animation", description: "Animation playback", icon: "Film", color: "#a855f7", properties: [{ name: "current_animation", type: "StringName", default: '""', description: "Playing animation" }, { name: "playback_speed", type: "float", default: "1.0", description: "Play speed" }], signals: [{ name: "animation_finished", params: ["anim_name: StringName"] }], methods: [{ name: "play", params: ["name: StringName"], returnType: "void", description: "Play animation" }, { name: "stop", params: [], returnType: "void", description: "Stop animation" }], example: "anim_player.play('idle')" },
  { id: "animatontree", name: "AnimationTree", inherits: "Node", category: "Animation", description: "Animation state machine", icon: "Workflow", color: "#a855f7", properties: [{ name: "anim_player_path", type: "NodePath", default: "null", description: "Linked AnimationPlayer" }], signals: [], methods: [], example: "anim_tree.set('parameters/playback/travel', 'run')" },
  { id: "subviewport", name: "SubViewport", inherits: "Viewport", category: "Rendering", description: "Sub-viewport for RTT", icon: "Monitor", color: "#6b7280", properties: [{ name: "size", type: "Vector2i", default: "1024,768", description: "Size" }], signals: [], methods: [], example: "subviewport.size = Vector2i(512, 512)" },
  { id: "subviewportcontainer", name: "SubViewportContainer", inherits: "Control", category: "UI", description: "Container for SubViewport", icon: "Monitor", color: "#3b82f6", properties: [{ name: "stretch", type: "bool", default: "false", description: "Stretch viewport" }], signals: [], methods: [], example: "container.stretch = true" },
  { id: "basebuttonnode", name: "BaseButton", inherits: "Control", category: "UI", description: "Base button class", icon: "Square", color: "#3b82f6", properties: [{ name: "pressed", type: "bool", default: "false", description: "Is pressed" }], signals: [{ name: "pressed", params: [] }, { name: "toggled", params: ["button_pressed: bool"] }], methods: [], example: "button.pressed.connect(_on_button_pressed)" },
  { id: "modulate", name: "CanvasItem", inherits: "Node", category: "Rendering", description: "Base rendering node", icon: "Eye", color: "#6b7280", properties: [{ name: "modulate", type: "Color", default: "white", description: "Color tint" }, { name: "visible", type: "bool", default: "true", description: "Visibility" }], signals: [], methods: [], example: "item.modulate = Color(1, 0, 0, 0.5)" },
  { id: "focusablecontrol", name: "FocusableControl", inherits: "Control", category: "UI", description: "Focusable control (deprecated)", icon: "Square", color: "#3b82f6", properties: [], signals: [], methods: [], example: "control.grab_focus()" },
  { id: "windowdialog", name: "Window", inherits: "Viewport", category: "UI", description: "Native window", icon: "Window", color: "#3b82f6", properties: [{ name: "title", type: "String", default: '"Untitled"', description: "Window title" }, { name: "size", type: "Vector2i", default: "800,600", description: "Window size" }], signals: [{ name: "close_requested", params: [] }], methods: [], example: "window.title = 'My App'" },
  { id: "polygon2d", name: "Polygon2D", inherits: "Node2D", category: "2D", description: "2D polygon mesh", icon: "Polygon", color: "#10b981", properties: [{ name: "polygon", type: "PackedVector2Array", default: "[]", description: "Vertices" }], signals: [], methods: [], example: "polygon.polygon = [Vector2(0,0), Vector2(100,0), Vector2(100,100)]" },
  { id: "multimesh3d", name: "MultiMeshInstance3D", inherits: "Node3D", category: "3D", description: "Multiple mesh instances", icon: "Cube", color: "#06b6d4", properties: [{ name: "multimesh", type: "MultiMesh", default: "null", description: "MultiMesh resource" }], signals: [], methods: [], example: "multimesh_instance.multimesh = multimesh" },
  { id: "gpuparticles2d", name: "GPUParticles2DAdvanced", inherits: "Node2D", category: "2D", description: "GPU particles 2D advanced", icon: "Sparkles", color: "#f59e0b", properties: [{ name: "amount", type: "int", default: "8", description: "Particle count" }], signals: [], methods: [], example: "particles.emitting = true" },
  { id: "path2d", name: "Path2D", inherits: "Node2D", category: "2D", description: "2D path curve", icon: "Squiggly", color: "#10b981", properties: [{ name: "curve", type: "Curve2D", default: "null", description: "Path curve" }], signals: [], methods: [], example: "path.curve = Curve2D.new()" },
  { id: "path3d", name: "Path3D", inherits: "Node3D", category: "3D", description: "3D path curve", icon: "Squiggly", color: "#06b6d4", properties: [{ name: "curve", type: "Curve3D", default: "null", description: "Path curve" }], signals: [], methods: [], example: "path.curve = Curve3D.new()" },
  { id: "pathfollow2d", name: "PathFollow2D", inherits: "Node2D", category: "2D", description: "Follow 2D path", icon: "Move", color: "#10b981", properties: [{ name: "offset", type: "float", default: "0.0", description: "Distance along path" }], signals: [], methods: [], example: "path_follow.offset = 50" },
  { id: "pathfollow3d", name: "PathFollow3D", inherits: "Node3D", category: "3D", description: "Follow 3D path", icon: "Move", color: "#06b6d4", properties: [{ name: "offset", type: "float", default: "0.0", description: "Distance along path" }], signals: [], methods: [], example: "path_follow.offset = 100" },
  { id: "resourcepreloader", name: "ResourcePreloader", inherits: "Node", category: "Resource", description: "Preload resources", icon: "Package", color: "#6b7280", properties: [], signals: [], methods: [{ name: "get_resource", params: ["name: StringName"], returnType: "Resource", description: "Get preloaded resource" }], example: "preloader.get_resource('texture')" },
  { id: "scenefiledialog", name: "SceneTreeDialog", inherits: "Window", category: "Editor", description: "Scene tree selection dialog", icon: "Tree", color: "#6b7280", properties: [], signals: [{ name: "selected", params: ["path: String"] }], methods: [], example: "dialog.tree_selected.connect(_on_tree_selected)" }
];
function getNodesByCategory(category) {
  return GODOT_NODES_DATABASE.filter((n) => n.category === category);
}
function searchNodes(query) {
  const lowerQuery = query.toLowerCase();
  return GODOT_NODES_DATABASE.filter(
    (n) => n.name.toLowerCase().includes(lowerQuery) || n.description.toLowerCase().includes(lowerQuery)
  );
}

// shared/block-schema.ts
var BLOCK_DEFINITIONS = {
  // ===== INPUT EVENTS (4) =====
  "event_keyboard": {
    id: "event_keyboard",
    label: "Keyboard Input",
    category: "events",
    color: "#FF6B6B",
    description: "Trigger on keyboard input",
    fields: [
      {
        id: "key",
        label: "Key",
        type: "dropdown",
        default: "W",
        options: [
          // Movement
          { label: "W", value: "W" },
          { label: "A", value: "A" },
          { label: "S", value: "S" },
          { label: "D", value: "D" },
          // Common
          { label: "Space", value: "SPACE" },
          { label: "Shift", value: "SHIFT" },
          { label: "Ctrl", value: "CTRL" },
          { label: "Alt", value: "ALT" },
          { label: "Enter", value: "ENTER" },
          { label: "Escape", value: "ESCAPE" },
          // Arrow Keys
          { label: "Up", value: "UP" },
          { label: "Down", value: "DOWN" },
          { label: "Left", value: "LEFT" },
          { label: "Right", value: "RIGHT" },
          // Function Keys
          { label: "F1", value: "F1" },
          { label: "F2", value: "F2" },
          { label: "F3", value: "F3" },
          { label: "F4", value: "F4" },
          { label: "Tab", value: "TAB" },
          { label: "Backspace", value: "BACKSPACE" },
          { label: "Delete", value: "DELETE" },
          { label: "Home", value: "HOME" },
          { label: "End", value: "END" },
          // Letters
          { label: "Q", value: "Q" },
          { label: "E", value: "E" },
          { label: "R", value: "R" },
          { label: "T", value: "T" },
          { label: "Y", value: "Y" },
          { label: "U", value: "U" },
          { label: "I", value: "I" },
          { label: "O", value: "O" },
          { label: "P", value: "P" },
          { label: "X", value: "X" },
          { label: "Z", value: "Z" },
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" }
        ]
      },
      {
        id: "key_event",
        label: "Event Type",
        type: "dropdown",
        default: "pressed",
        options: [
          { label: "Pressed", value: "pressed" },
          { label: "Released", value: "released" },
          { label: "Held", value: "held" }
        ]
      }
    ]
  },
  "event_mouse": {
    id: "event_mouse",
    label: "Mouse Input",
    category: "events",
    color: "#FF9999",
    description: "Trigger on mouse input",
    fields: [
      {
        id: "mouse_event",
        label: "Mouse Event",
        type: "dropdown",
        default: "left_click",
        options: [
          { label: "Left Click", value: "left_click" },
          { label: "Right Click", value: "right_click" },
          { label: "Middle Click", value: "middle_click" },
          { label: "Left Released", value: "left_released" },
          { label: "Right Released", value: "right_released" },
          { label: "Move", value: "move" },
          { label: "Scroll Up", value: "scroll_up" },
          { label: "Scroll Down", value: "scroll_down" },
          { label: "Enter Area", value: "enter_area" },
          { label: "Exit Area", value: "exit_area" }
        ]
      },
      { id: "target", label: "Target (path)", type: "text", default: "." }
    ]
  },
  "event_touch": {
    id: "event_touch",
    label: "Touch Input",
    category: "events",
    color: "#FFCC99",
    description: "Trigger on touch input",
    fields: [
      {
        id: "touch_event",
        label: "Touch Event",
        type: "dropdown",
        default: "tap",
        options: [
          { label: "Tap", value: "tap" },
          { label: "Double Tap", value: "double_tap" },
          { label: "Long Press", value: "long_press" },
          { label: "Drag", value: "drag" },
          { label: "Swipe Left", value: "swipe_left" },
          { label: "Swipe Right", value: "swipe_right" },
          { label: "Swipe Up", value: "swipe_up" },
          { label: "Swipe Down", value: "swipe_down" },
          { label: "Pinch", value: "pinch" },
          { label: "Two Finger", value: "two_finger" }
        ]
      },
      { id: "target", label: "Target (path)", type: "text", default: "." }
    ]
  },
  "event_action": {
    id: "event_action",
    label: "Input Action",
    category: "events",
    color: "#FFDDAA",
    description: "Trigger on named input action",
    fields: [
      {
        id: "action_name",
        label: "Action",
        type: "dropdown",
        default: "ui_accept",
        options: [
          { label: "ui_accept", value: "ui_accept" },
          { label: "ui_select", value: "ui_select" },
          { label: "ui_cancel", value: "ui_cancel" },
          { label: "ui_focus_next", value: "ui_focus_next" },
          { label: "ui_focus_prev", value: "ui_focus_prev" },
          { label: "ui_left", value: "ui_left" },
          { label: "ui_right", value: "ui_right" },
          { label: "ui_up", value: "ui_up" },
          { label: "ui_down", value: "ui_down" },
          { label: "ui_page_up", value: "ui_page_up" },
          { label: "ui_page_down", value: "ui_page_down" },
          { label: "ui_home", value: "ui_home" },
          { label: "ui_end", value: "ui_end" },
          { label: "ui_cut", value: "ui_cut" },
          { label: "ui_copy", value: "ui_copy" },
          { label: "ui_paste", value: "ui_paste" },
          { label: "ui_undo", value: "ui_undo" },
          { label: "ui_redo", value: "ui_redo" },
          { label: "ui_text_submit", value: "ui_text_submit" },
          { label: "ui_text_completion_query", value: "ui_text_completion_query" }
        ]
      },
      {
        id: "action_event",
        label: "Event Type",
        type: "dropdown",
        default: "pressed",
        options: [
          { label: "Pressed", value: "pressed" },
          { label: "Released", value: "released" },
          { label: "Just Pressed", value: "just_pressed" },
          { label: "Just Released", value: "just_released" }
        ]
      }
    ]
  },
  "movement_set": {
    id: "movement_set",
    label: "Set Movement",
    category: "movement",
    color: "#4ECDC4",
    description: "Set movement direction and speed",
    fields: [
      {
        id: "direction",
        label: "Direction",
        type: "dropdown",
        default: "X",
        options: [
          { label: "X (Right)", value: "X" },
          { label: "-X (Left)", value: "-X" },
          { label: "Y (Up)", value: "Y" },
          { label: "-Y (Down)", value: "-Y" },
          { label: "Z (Forward)", value: "Z" },
          { label: "-Z (Back)", value: "-Z" }
        ]
      },
      { id: "speed", label: "Speed", type: "number", default: 5 }
    ]
  },
  "animation_play": {
    id: "animation_play",
    label: "Play Animation",
    category: "animation",
    color: "#95E1D3",
    description: "Play animation with speed",
    fields: [
      { id: "name", label: "Animation", type: "text", default: "walk" },
      { id: "speed", label: "Speed", type: "number", default: 1 },
      { id: "backward", label: "Backward", type: "boolean", default: false }
    ]
  },
  "rotation_set": {
    id: "rotation_set",
    label: "Set Rotation",
    category: "rotation",
    color: "#FFD93D",
    description: "Set rotation on axis",
    fields: [
      {
        id: "axis",
        label: "Axis",
        type: "dropdown",
        default: "Y",
        options: [
          { label: "X", value: "X" },
          { label: "Y", value: "Y" },
          { label: "Z", value: "Z" }
        ]
      },
      { id: "degrees", label: "Degrees", type: "number", default: 45 }
    ]
  },
  // ===== CONTROL FLOW (4) =====
  "control_if": {
    id: "control_if",
    label: "If - Check Condition",
    category: "control",
    color: "#FFA500",
    description: "Execute if condition is true",
    fields: [
      { id: "condition", label: "Condition", type: "text", default: "true" }
    ]
  },
  "control_if_else": {
    id: "control_if_else",
    label: "If Else - Branch",
    category: "control",
    color: "#FF8C00",
    description: "Execute one of two branches",
    fields: [
      { id: "condition", label: "Condition", type: "text", default: "true" }
    ]
  },
  "switch_case": {
    id: "switch_case",
    label: "Switch Case",
    category: "control",
    color: "#FF6347",
    description: "Switch statement",
    fields: [
      { id: "variable", label: "Variable", type: "text", default: "state" },
      { id: "cases", label: "Cases", type: "text", default: "case1,case2,case3" }
    ]
  },
  "ternary_op": {
    id: "ternary_op",
    label: "Ternary Operator",
    category: "control",
    color: "#FF4500",
    description: "Inline if/else",
    fields: [
      { id: "condition", label: "Condition", type: "text", default: "x > 0" },
      { id: "true_val", label: "True Value", type: "text", default: "1" },
      { id: "false_val", label: "False Value", type: "text", default: "0" }
    ]
  },
  // ===== VARIABLES (7) =====
  "var_set": {
    id: "var_set",
    label: "Set Variable",
    category: "variables",
    color: "#2196F3",
    description: "Set variable value",
    fields: [
      { id: "var_name", label: "Variable", type: "text", default: "my_var" },
      { id: "value", label: "Value", type: "text", default: "0" },
      {
        id: "operation",
        label: "Operation",
        type: "dropdown",
        default: "set",
        options: [
          { label: "Set", value: "set" },
          { label: "Add", value: "add" },
          { label: "Subtract", value: "subtract" },
          { label: "Multiply", value: "multiply" },
          { label: "Divide", value: "divide" }
        ]
      }
    ]
  },
  "var_get": {
    id: "var_get",
    label: "Get Variable",
    category: "variables",
    color: "#03A9F4",
    description: "Get variable value",
    fields: [{ id: "var_name", label: "Variable", type: "text", default: "my_var" }]
  },
  "var_random": {
    id: "var_random",
    label: "Random Value",
    category: "variables",
    color: "#00BCD4",
    description: "Generate random number",
    fields: [
      { id: "var_name", label: "Variable", type: "text", default: "rand_val" },
      { id: "min", label: "Min", type: "number", default: 0 },
      { id: "max", label: "Max", type: "number", default: 100 }
    ]
  },
  "var_lerp": {
    id: "var_lerp",
    label: "Linear Interpolate",
    category: "variables",
    color: "#009688",
    description: "Lerp between values",
    fields: [
      { id: "var_name", label: "Variable", type: "text", default: "lerp_val" },
      { id: "start", label: "Start", type: "number", default: 0 },
      { id: "end", label: "End", type: "number", default: 1 },
      { id: "weight", label: "Weight", type: "number", default: 0.5 }
    ]
  },
  "var_clamp": {
    id: "var_clamp",
    label: "Clamp Variable",
    category: "variables",
    color: "#4CAF50",
    description: "Clamp between min/max",
    fields: [
      { id: "var_name", label: "Variable", type: "text", default: "clamped" },
      { id: "min", label: "Min", type: "number", default: 0 },
      { id: "max", label: "Max", type: "number", default: 100 }
    ]
  },
  "var_array": {
    id: "var_array",
    label: "Array Operation",
    category: "variables",
    color: "#8BC34A",
    description: "Array push/pop/append",
    fields: [
      { id: "array_name", label: "Array", type: "text", default: "arr" },
      {
        id: "operation",
        label: "Operation",
        type: "dropdown",
        default: "push",
        options: [
          { label: "Push", value: "push" },
          { label: "Pop", value: "pop" },
          { label: "Append", value: "append" },
          { label: "Remove", value: "remove" }
        ]
      },
      { id: "value", label: "Value", type: "text", default: "" }
    ]
  },
  "var_dict": {
    id: "var_dict",
    label: "Dictionary Operation",
    category: "variables",
    color: "#CDDC39",
    description: "Dictionary set/get",
    fields: [
      { id: "dict_name", label: "Dictionary", type: "text", default: "dict" },
      {
        id: "operation",
        label: "Operation",
        type: "dropdown",
        default: "set",
        options: [
          { label: "Set", value: "set" },
          { label: "Get", value: "get" },
          { label: "Has", value: "has" },
          { label: "Erase", value: "erase" }
        ]
      },
      { id: "key", label: "Key", type: "text", default: "key" },
      { id: "value", label: "Value", type: "text", default: "value" }
    ]
  },
  // ===== LOOPS (6) =====
  "loop_for": {
    id: "loop_for",
    label: "For - Range Counter",
    category: "loops",
    color: "#FF9800",
    description: "Loop from start to end",
    fields: [
      { id: "start", label: "Start", type: "number", default: 0 },
      { id: "end", label: "End", type: "number", default: 10 },
      { id: "step", label: "Step", type: "number", default: 1 },
      { id: "var_name", label: "Counter", type: "text", default: "i" }
    ]
  },
  "loop_repeat": {
    id: "loop_repeat",
    label: "Repeat - N Times",
    category: "loops",
    color: "#E91E63",
    description: "Repeat exactly N times",
    fields: [
      { id: "times", label: "Times", type: "number", default: 5 },
      { id: "counter_var", label: "Counter", type: "text", default: "count" }
    ]
  },
  "loop_while": {
    id: "loop_while",
    label: "While - Condition Based",
    category: "loops",
    color: "#FF5722",
    description: "Loop while condition is true",
    fields: [
      { id: "condition", label: "Condition", type: "text", default: "true" },
      { id: "max_iter", label: "Max Iterations", type: "number", default: 100 }
    ]
  },
  "loop_foreach": {
    id: "loop_foreach",
    label: "For Each - Array Iterator",
    category: "loops",
    color: "#F44336",
    description: "Loop through each array item",
    fields: [
      { id: "array_name", label: "Array", type: "text", default: "items" },
      { id: "item_var", label: "Item Variable", type: "text", default: "item" },
      { id: "index_var", label: "Index Variable", type: "text", default: "i" }
    ]
  },
  "loop_control": {
    id: "loop_control",
    label: "Loop Control",
    category: "loops",
    color: "#9C27B0",
    description: "Break/Continue/Return",
    fields: [
      {
        id: "control",
        label: "Control Type",
        type: "dropdown",
        default: "break",
        options: [
          { label: "Break", value: "break" },
          { label: "Continue", value: "continue" },
          { label: "Return", value: "return" }
        ]
      }
    ]
  },
  "loop_interval": {
    id: "loop_interval",
    label: "Interval Loop",
    category: "loops",
    color: "#673AB7",
    description: "Loop with time interval",
    fields: [
      { id: "interval", label: "Interval (sec)", type: "number", default: 1 },
      { id: "times", label: "Times", type: "number", default: 5 },
      { id: "unlimited", label: "Unlimited", type: "boolean", default: false }
    ]
  },
  // ===== SIGNALS (5) =====
  "signal_custom": {
    id: "signal_custom",
    label: "Custom Signal",
    category: "signals",
    color: "#3F51B5",
    description: "Define custom signal",
    fields: [
      { id: "signal_name", label: "Signal Name", type: "text", default: "my_signal" },
      { id: "params", label: "Parameters", type: "text", default: "" }
    ]
  },
  "signal_emit": {
    id: "signal_emit",
    label: "Emit Signal",
    category: "signals",
    color: "#2196F3",
    description: "Emit signal with args",
    fields: [
      { id: "signal_name", label: "Signal", type: "text", default: "my_signal" },
      { id: "arg1", label: "Arg 1", type: "text", default: "" },
      { id: "arg2", label: "Arg 2", type: "text", default: "" }
    ]
  },
  "signal_bus": {
    id: "signal_bus",
    label: "Signal Bus",
    category: "signals",
    color: "#00BCD4",
    description: "Global signal bus",
    fields: [
      { id: "bus_name", label: "Bus", type: "text", default: "GlobalSignalBus" },
      {
        id: "action",
        label: "Action",
        type: "dropdown",
        default: "emit",
        options: [
          { label: "Emit", value: "emit" },
          { label: "Connect", value: "connect" },
          { label: "Disconnect", value: "disconnect" }
        ]
      },
      { id: "signal_name", label: "Signal", type: "text", default: "" }
    ]
  },
  "signal_debounce": {
    id: "signal_debounce",
    label: "Debounce Signal",
    category: "signals",
    color: "#009688",
    description: "Debounce signal emissions",
    fields: [
      { id: "signal_name", label: "Signal", type: "text", default: "signal" },
      { id: "delay", label: "Delay (sec)", type: "number", default: 0.5 }
    ]
  },
  "signal_throttle": {
    id: "signal_throttle",
    label: "Throttle Signal",
    category: "signals",
    color: "#4CAF50",
    description: "Throttle signal emissions",
    fields: [
      { id: "signal_name", label: "Signal", type: "text", default: "signal" },
      { id: "cooldown", label: "Cooldown (sec)", type: "number", default: 0.1 }
    ]
  },
  // ===== GROUPS (6) =====
  "group_add": {
    id: "group_add",
    label: "Add to Group",
    category: "groups",
    color: "#FFC107",
    description: "Add node to group",
    fields: [
      { id: "group_name", label: "Group", type: "text", default: "enemies" },
      { id: "persistent", label: "Persistent", type: "boolean", default: false }
    ]
  },
  "group_remove": {
    id: "group_remove",
    label: "Remove from Group",
    category: "groups",
    color: "#FF9800",
    description: "Remove from group",
    fields: [{ id: "group_name", label: "Group", type: "text", default: "enemies" }]
  },
  "group_get": {
    id: "group_get",
    label: "Get Group Nodes",
    category: "groups",
    color: "#FF5722",
    description: "Get all nodes in group",
    fields: [
      { id: "group_name", label: "Group", type: "text", default: "enemies" },
      { id: "var_name", label: "Store in", type: "text", default: "nodes" }
    ]
  },
  "group_check": {
    id: "group_check",
    label: "Is in Group",
    category: "groups",
    color: "#F44336",
    description: "Check if node in group",
    fields: [{ id: "group_name", label: "Group", type: "text", default: "enemies" }]
  },
  "group_foreach": {
    id: "group_foreach",
    label: "Group For Each",
    category: "groups",
    color: "#E91E63",
    description: "Loop through group nodes",
    fields: [
      { id: "group_name", label: "Group", type: "text", default: "enemies" },
      { id: "node_var", label: "Node Variable", type: "text", default: "enemy" }
    ]
  },
  "group_call": {
    id: "group_call",
    label: "Call on Group",
    category: "groups",
    color: "#9C27B0",
    description: "Call method on group nodes",
    fields: [
      { id: "group_name", label: "Group", type: "text", default: "enemies" },
      { id: "method_name", label: "Method", type: "text", default: "take_damage" },
      { id: "args", label: "Arguments", type: "text", default: "" }
    ]
  },
  // ===== DATA (5) =====
  "data_save": {
    id: "data_save",
    label: "Save Data",
    category: "data",
    color: "#795548",
    description: "Save data to file",
    fields: [
      { id: "file_path", label: "File Path", type: "text", default: "user://save.json" },
      { id: "data_var", label: "Data Variable", type: "text", default: "game_data" },
      { id: "encrypt", label: "Encrypt", type: "boolean", default: false }
    ]
  },
  "data_load": {
    id: "data_load",
    label: "Load Data",
    category: "data",
    color: "#607D8B",
    description: "Load data from file",
    fields: [
      { id: "file_path", label: "File Path", type: "text", default: "user://save.json" },
      { id: "var_name", label: "Store in", type: "text", default: "game_data" },
      { id: "default_val", label: "Default", type: "text", default: "{}" }
    ]
  },
  "config_save": {
    id: "config_save",
    label: "Save Config",
    category: "data",
    color: "#9E9E9E",
    description: "Save to config file",
    fields: [
      { id: "section", label: "Section", type: "text", default: "settings" },
      { id: "key", label: "Key", type: "text", default: "volume" },
      { id: "value", label: "Value", type: "text", default: "0.8" }
    ]
  },
  "config_load": {
    id: "config_load",
    label: "Load Config",
    category: "data",
    color: "#757575",
    description: "Load from config file",
    fields: [
      { id: "section", label: "Section", type: "text", default: "settings" },
      { id: "key", label: "Key", type: "text", default: "volume" },
      { id: "default_val", label: "Default", type: "text", default: "0.8" }
    ]
  },
  "prefs": {
    id: "prefs",
    label: "Player Preferences",
    category: "data",
    color: "#616161",
    description: "Save player preferences",
    fields: [
      { id: "pref_name", label: "Preference", type: "text", default: "high_score" },
      {
        id: "action",
        label: "Action",
        type: "dropdown",
        default: "get",
        options: [
          { label: "Get", value: "get" },
          { label: "Set", value: "set" },
          { label: "Has", value: "has" },
          { label: "Erase", value: "erase" }
        ]
      },
      { id: "value", label: "Value", type: "text", default: "" }
    ]
  },
  // ===== LABELS (5) =====
  "label_set": {
    id: "label_set",
    label: "Set Label Text",
    category: "labels",
    color: "#2196F3",
    description: "Set label text",
    fields: [
      { id: "label_path", label: "Label Path", type: "text", default: "$Label" },
      { id: "text", label: "Text", type: "text", default: "Hello World!" },
      { id: "format", label: "Format Vars", type: "boolean", default: false }
    ]
  },
  "label_update": {
    id: "label_update",
    label: "Update Label",
    category: "labels",
    color: "#03A9F4",
    description: "Update label with variable",
    fields: [
      { id: "label_path", label: "Label Path", type: "text", default: "$Label" },
      { id: "template", label: "Template", type: "text", default: "Score: {score}" },
      { id: "update_rate", label: "Update Rate", type: "number", default: 0.1 }
    ]
  },
  "label_animate": {
    id: "label_animate",
    label: "Animate Label",
    category: "labels",
    color: "#00BCD4",
    description: "Animate label text",
    fields: [
      { id: "label_path", label: "Label Path", type: "text", default: "$Label" },
      {
        id: "anim_type",
        label: "Animation",
        type: "dropdown",
        default: "typewriter",
        options: [
          { label: "Typewriter", value: "typewriter" },
          { label: "Fade", value: "fade" },
          { label: "Scale", value: "scale" },
          { label: "Color Change", value: "color_change" }
        ]
      },
      { id: "speed", label: "Speed", type: "number", default: 0.05 },
      { id: "final_text", label: "Final Text", type: "text", default: "" }
    ]
  },
  "label_rich": {
    id: "label_rich",
    label: "Rich Text Label",
    category: "labels",
    color: "#009688",
    description: "Rich text with BBCode",
    fields: [
      { id: "label_path", label: "Label Path", type: "text", default: "$RichTextLabel" },
      { id: "bbcode", label: "Use BBCode", type: "boolean", default: true },
      { id: "text", label: "Text", type: "text", default: "[color=red]Warning![/color]" }
    ]
  },
  "label_visibility": {
    id: "label_visibility",
    label: "Label Visibility",
    category: "labels",
    color: "#4CAF50",
    description: "Show/Hide/Toggle label",
    fields: [
      { id: "label_path", label: "Label Path", type: "text", default: "$Label" },
      {
        id: "action",
        label: "Action",
        type: "dropdown",
        default: "show",
        options: [
          { label: "Show", value: "show" },
          { label: "Hide", value: "hide" },
          { label: "Toggle", value: "toggle" }
        ]
      },
      { id: "fade", label: "Fade", type: "boolean", default: false },
      { id: "duration", label: "Duration", type: "number", default: 0.5 }
    ]
  },
  // ===== CONDITIONS (4) =====
  "cond_null_check": {
    id: "cond_null_check",
    label: "Null Check",
    category: "conditions",
    color: "#F44336",
    description: "Check if null/none",
    fields: [
      { id: "variable", label: "Variable", type: "text", default: "target" },
      {
        id: "check_type",
        label: "Check Type",
        type: "dropdown",
        default: "is_null",
        options: [
          { label: "Is Null", value: "is_null" },
          { label: "Is Not Null", value: "is_not_null" },
          { label: "Is Valid", value: "is_instance_valid" }
        ]
      }
    ]
  },
  "cond_type_check": {
    id: "cond_type_check",
    label: "Type Check",
    category: "conditions",
    color: "#E91E63",
    description: "Check variable type",
    fields: [
      { id: "variable", label: "Variable", type: "text", default: "node" },
      { id: "type", label: "Type", type: "text", default: "RigidBody3D" },
      {
        id: "check_method",
        label: "Method",
        type: "dropdown",
        default: "is",
        options: [
          { label: "Is", value: "is" },
          { label: "Get Class", value: "get_class" }
        ]
      }
    ]
  },
  "cond_compare": {
    id: "cond_compare",
    label: "Compare Values",
    category: "conditions",
    color: "#9C27B0",
    description: "Compare two values",
    fields: [
      { id: "left", label: "Left", type: "text", default: "a" },
      {
        id: "operator",
        label: "Operator",
        type: "dropdown",
        default: "==",
        options: [
          { label: "==", value: "==" },
          { label: "!=", value: "!=" },
          { label: "<", value: "<" },
          { label: ">", value: ">" },
          { label: "<=", value: "<=" },
          { label: ">=", value: ">=" }
        ]
      },
      { id: "right", label: "Right", type: "text", default: "b" }
    ]
  },
  "cond_logic": {
    id: "cond_logic",
    label: "Logic Operations",
    category: "conditions",
    color: "#673AB7",
    description: "AND, OR, NOT operations",
    fields: [
      {
        id: "operation",
        label: "Operation",
        type: "dropdown",
        default: "and",
        options: [
          { label: "AND", value: "and" },
          { label: "OR", value: "or" },
          { label: "NOT", value: "not" }
        ]
      },
      { id: "left", label: "Left", type: "text", default: "condition1" },
      { id: "right", label: "Right", type: "text", default: "condition2" }
    ]
  },
  // ===== ROTATION (3) =====
  "rotate_x": {
    id: "rotate_x",
    label: "Rotate X",
    category: "rotation",
    color: "#FF5252",
    description: "Rotate around X axis",
    fields: [{ id: "degrees", label: "Degrees", type: "number", default: 45 }]
  },
  "rotate_y": {
    id: "rotate_y",
    label: "Rotate Y",
    category: "rotation",
    color: "#FF5252",
    description: "Rotate around Y axis",
    fields: [{ id: "degrees", label: "Degrees", type: "number", default: 45 }]
  },
  "rotate_z": {
    id: "rotate_z",
    label: "Rotate Z",
    category: "rotation",
    color: "#FF5252",
    description: "Rotate around Z axis",
    fields: [{ id: "degrees", label: "Degrees", type: "number", default: 45 }]
  },
  // ===== SCALE (3) =====
  "scale_uniform": {
    id: "scale_uniform",
    label: "Scale (Uniform)",
    category: "scale",
    color: "#66BB6A",
    description: "Scale equally on all axes",
    fields: [{ id: "scale", label: "Scale", type: "number", default: 1.5 }]
  },
  "scale_xyz": {
    id: "scale_xyz",
    label: "Scale (X/Y/Z)",
    category: "scale",
    color: "#66BB6A",
    description: "Scale per axis",
    fields: [
      { id: "x", label: "X", type: "number", default: 1 },
      { id: "y", label: "Y", type: "number", default: 1 },
      { id: "z", label: "Z", type: "number", default: 1 }
    ]
  },
  "scale_2d": {
    id: "scale_2d",
    label: "Scale (2D)",
    category: "scale",
    color: "#66BB6A",
    description: "Scale X and Y",
    fields: [
      { id: "x", label: "X", type: "number", default: 1 },
      { id: "y", label: "Y", type: "number", default: 1 }
    ]
  },
  // ===== PHYSICS (4) =====
  "physics_apply_force": {
    id: "physics_apply_force",
    label: "Apply Force",
    category: "physics",
    color: "#42A5F5",
    description: "Apply force to body",
    fields: [
      {
        id: "direction",
        label: "Direction",
        type: "dropdown",
        default: "forward",
        options: [
          { label: "Forward", value: "forward" },
          { label: "Up", value: "up" },
          { label: "Right", value: "right" }
        ]
      },
      { id: "magnitude", label: "Magnitude", type: "number", default: 10 }
    ]
  },
  "physics_apply_impulse": {
    id: "physics_apply_impulse",
    label: "Apply Impulse",
    category: "physics",
    color: "#2196F3",
    description: "Apply impulse to body",
    fields: [
      { id: "direction", label: "Direction", type: "text", default: "0,1,0" },
      { id: "impulse", label: "Impulse", type: "number", default: 5 }
    ]
  },
  "physics_set_velocity": {
    id: "physics_set_velocity",
    label: "Set Velocity",
    category: "physics",
    color: "#1976D2",
    description: "Set velocity directly",
    fields: [
      { id: "x", label: "X", type: "number", default: 0 },
      { id: "y", label: "Y", type: "number", default: 0 },
      { id: "z", label: "Z", type: "number", default: 0 }
    ]
  },
  "physics_gravity": {
    id: "physics_gravity",
    label: "Set Gravity",
    category: "physics",
    color: "#1565C0",
    description: "Set gravity scale",
    fields: [{ id: "gravity", label: "Gravity Scale", type: "number", default: 1 }]
  },
  // ===== ADVANCED (6) =====
  "advanced_print": {
    id: "advanced_print",
    label: "Print Debug",
    category: "advanced",
    color: "#9C27B0",
    description: "Print to console",
    fields: [{ id: "message", label: "Message", type: "text", default: "Debug message" }]
  },
  "advanced_spawn": {
    id: "advanced_spawn",
    label: "Spawn Node",
    category: "advanced",
    color: "#8B008B",
    description: "Instantiate node",
    fields: [
      { id: "scene_path", label: "Scene Path", type: "text", default: "res://enemy.tscn" },
      { id: "position", label: "Position", type: "text", default: "0,0,0" },
      { id: "parent", label: "Parent Path", type: "text", default: "." }
    ]
  },
  "advanced_destroy": {
    id: "advanced_destroy",
    label: "Destroy Node",
    category: "advanced",
    color: "#800000",
    description: "Destroy/free node",
    fields: [
      { id: "delay", label: "Delay (sec)", type: "number", default: 0 },
      { id: "immediate", label: "Immediate", type: "boolean", default: false }
    ]
  },
  "advanced_tween": {
    id: "advanced_tween",
    label: "Tween Animation",
    category: "advanced",
    color: "#FF1493",
    description: "Create tween animation",
    fields: [
      { id: "property", label: "Property", type: "text", default: "position" },
      { id: "end_value", label: "End Value", type: "text", default: "10" },
      { id: "duration", label: "Duration (sec)", type: "number", default: 1 },
      { id: "easing", label: "Easing", type: "text", default: "ease_in_out" }
    ]
  },
  "advanced_audio": {
    id: "advanced_audio",
    label: "Play Audio",
    category: "advanced",
    color: "#20B2AA",
    description: "Play audio stream",
    fields: [
      { id: "audio_path", label: "Audio Path", type: "text", default: "res://sound.ogg" },
      { id: "volume", label: "Volume (dB)", type: "number", default: 0 },
      { id: "pitch", label: "Pitch Scale", type: "number", default: 1 }
    ]
  },
  "advanced_timer": {
    id: "advanced_timer",
    label: "Wait for Time",
    category: "advanced",
    color: "#00CED1",
    description: "Wait/delay action",
    fields: [{ id: "seconds", label: "Seconds", type: "number", default: 1 }]
  }
};
function getBlockDefinition(blockType) {
  return BLOCK_DEFINITIONS[blockType];
}

// server/block-code-generator.ts
var BlockCodeGenerator = class {
  indentLevel = 0;
  variables = /* @__PURE__ */ new Map();
  generate(sequence) {
    this.indentLevel = 0;
    this.variables = /* @__PURE__ */ new Map();
    if (sequence.variables) {
      for (const v of sequence.variables) {
        this.variables.set(v.name, { type: v.type, value: v.value });
      }
    }
    const extendsClass = sequence.startNodeType || "CharacterBody3D";
    let code = `extends ${extendsClass}

`;
    code += this.generateVariableDeclarations();
    code += `func _ready() -> void:
	pass

`;
    code += `func _physics_process(delta: float) -> void:
`;
    this.indentLevel = 1;
    code += this.generateBlockSequence(sequence.blocks, "delta");
    this.indentLevel = 0;
    return code;
  }
  generateVariableDeclarations() {
    if (this.variables.size === 0) return "";
    let code = "# Variables\n";
    const entries = Array.from(this.variables.entries());
    for (const [name, info] of entries) {
      code += `var ${name}: ${info.type} = ${info.value}
`;
    }
    code += "\n";
    return code;
  }
  generateBlockSequence(blocks, delta) {
    let code = "";
    for (const block of blocks) {
      code += this.generateBlock(block, delta);
    }
    return code || `	pass
`;
  }
  generateBlock(block, delta) {
    const definition = getBlockDefinition(block.type);
    if (!definition) return "";
    let template = `# Block: ${definition.label}
pass`;
    for (const [fieldId, value] of Object.entries(block.fields)) {
      template = template.replace(`{${fieldId}}`, String(value));
    }
    if (block.children.length > 0) {
      this.indentLevel++;
      const bodyCode = this.generateBlockSequence(block.children, delta);
      this.indentLevel--;
      template = template.replace("{body}", bodyCode.trimEnd());
      template = template.replace("{body_true}", bodyCode.trimEnd());
      template = template.replace("{body_false}", bodyCode.trimEnd());
    } else {
      template = template.replace("{body}", "pass");
      template = template.replace("{body_true}", "pass");
      template = template.replace("{body_false}", "pass");
    }
    const indent = "	".repeat(this.indentLevel);
    const lines = template.split("\n");
    const indentedCode = lines.map((line) => line ? indent + line : "").join("\n");
    return indentedCode + "\n";
  }
};
async function generateBlockCode(sequence) {
  const generator = new BlockCodeGenerator();
  return generator.generate(sequence);
}

// server/block-prompt-builder.ts
function buildBlockSequencePrompt(sequence, baseCode) {
  const blockDescriptions = sequence.blocks.map((block, index) => describeBlock(block, index)).join("\n");
  return `You are a professional Godot 4.4 GDScript code generator. 

I have created a block sequence that should be converted to production-ready GDScript code. Here's what the blocks represent:

${blockDescriptions}

The script extends: ${sequence.startNodeType || "Node"}

Here is the initial generated code:
\`\`\`gdscript
${baseCode}
\`\`\`

Your task:
1. Refine and optimize this code
2. Ensure all Godot 4.4 API is correct
3. Add proper variable declarations and type hints
4. Organize code into _ready(), _input(), and _physics_process() functions as needed
5. Ensure the code is production-ready and fully functional
6. Keep the exact same functionality but make it cleaner and more robust

Return ONLY the optimized GDScript code, no explanations.`;
}
function describeBlock(block, index) {
  const definition = getBlockDefinition(block.type);
  if (!definition) return "";
  const fieldDescriptions = definition.fields.map((field) => {
    const value = block.fields[field.id];
    return `  - ${field.label}: ${value ?? field.default}`;
  }).join("\n");
  return `Block ${index + 1}: ${definition.label}
Description: ${definition.description}
Fields:
${fieldDescriptions}`;
}
function summarizeBlockSequence(sequence) {
  return `Block Sequence: ${sequence.blocks.length} blocks, extends ${sequence.startNodeType || "Node"}
Blocks: ${sequence.blocks.map((b) => getBlockDefinition(b.type)?.label || "Unknown").join(", ")}`;
}

// server/index.ts
var import_meta2 = {};
var __dirname2 = import_path2.default.dirname((0, import_url2.fileURLToPath)(import_meta2.url));
var app = (0, import_express.default)();
var PORT = 5e3;
app.use(import_express.default.json({ limit: "50mb" }));
var upload = (0, import_multer.default)({ storage: import_multer.default.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "flowchart-gdscript-generator",
    version: "1.0.0",
    gemini: !!process.env.GEMINI_API_KEY,
    groq: !!process.env.GROQ_API_KEY
  });
});
app.post("/api/flowchart/generate", async (req, res) => {
  try {
    const parsed = flowchartGenerateRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid request",
        details: parsed.error.errors
      });
    }
    const { nodes, edges } = parsed.data;
    const validation = validateFlowchart(nodes, edges);
    if (!validation.isValid) {
      return res.status(400).json({
        error: "Flowchart validation failed",
        errors: validation.errors
      });
    }
    const gdscriptCode = await generateGDScriptFromFlowchart(nodes, edges);
    const hardcodedCode = ensureValidGDScript(gdscriptCode);
    let finalCode = hardcodedCode;
    let usedAI = false;
    let aiProvider = "none";
    const useAI = req.body.useAI !== false && (process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY);
    if (useAI) {
      try {
        const { buildFlowchartPrompt: buildFlowchartPrompt2 } = await Promise.resolve().then(() => (init_flowchart_prompt_builder(), flowchart_prompt_builder_exports));
        const { generateWithIntelligentFallback: generateWithIntelligentFallback2 } = await Promise.resolve().then(() => (init_ai_fallback_enhanced(), ai_fallback_enhanced_exports));
        const prompt = buildFlowchartPrompt2(nodes, edges);
        const refinementPrompt = `${prompt}

HERE IS THE INITIAL HARDCODED CODE:
\`\`\`gdscript
${hardcodedCode}
\`\`\`

Refine this code to make it production-ready while keeping it simple and following the flowchart logic exactly. Output only the refined GDScript code.`;
        const result = await generateWithIntelligentFallback2(refinementPrompt, {
          retries: 2,
          timeout: 45e3,
          preferProvider: "gemini"
        });
        finalCode = result.code || hardcodedCode;
        usedAI = true;
        aiProvider = result.provider;
        console.log(`[Flowchart] AI refinement applied with ${result.provider}`);
      } catch (error) {
        console.warn("[Flowchart] AI refinement failed, using hardcoded code:", error);
        finalCode = hardcodedCode;
      }
    }
    let codeIssues = { issues: [], isValid: true };
    try {
      codeIssues = await debugCode(finalCode);
    } catch (error) {
      console.warn("Code validation skipped:", error);
    }
    res.json({
      code: finalCode,
      validation,
      codeIssues,
      hardcodedCode,
      usedAI,
      aiProvider,
      note: usedAI ? "Code refined with AI" : "Hardcoded generation (AI unavailable)"
    });
  } catch (error) {
    console.error("Flowchart generation error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to generate flowchart code"
    });
  }
});
app.get("/api/templates/player", async (req, res) => {
  try {
    const template = await getPlayerTemplate();
    res.json(template);
  } catch (error) {
    console.error("Failed to get player template:", error);
    res.status(500).json({ error: "Failed to get player template" });
  }
});
app.post("/api/templates/player/generate", async (req, res) => {
  try {
    const { selectedFunctions, customVariables, useAI, enhancementPrompt } = req.body;
    const shouldUseAI = useAI || enhancementPrompt?.trim() || selectedFunctions?.length > 0 && (process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY);
    const script = await generatePlayerScript(
      selectedFunctions || [],
      customVariables || {},
      shouldUseAI,
      enhancementPrompt
    );
    res.json({ code: script });
  } catch (error) {
    console.error("Failed to generate player script:", error);
    res.status(500).json({ error: "Failed to generate script" });
  }
});
app.post("/api/scenes/generate", upload.single("image"), async (req, res) => {
  try {
    const { sceneCode } = req.body;
    const imageBuffer = req.file?.buffer;
    const tscnCode = await generateScene(sceneCode, imageBuffer);
    res.json({ tscnCode });
  } catch (error) {
    console.error("Scene generation failed:", error);
    res.status(500).json({ error: "Failed to generate scene" });
  }
});
app.get("/api/templates/library", (req, res) => {
  try {
    const templates = getTemplatesList();
    const categories = getAllCategories();
    res.json({ templates, categories });
  } catch (error) {
    console.error("Failed to list templates:", error);
    res.status(500).json({ error: "Failed to list templates" });
  }
});
app.get("/api/templates/library/:templateId/download", (req, res) => {
  try {
    const { templateId } = req.params;
    const templatesDir = import_path2.default.join(__dirname2, "templates");
    const templateFile = import_path2.default.join(templatesDir, `${templateId}.gd`);
    if (!import_fs2.default.existsSync(templateFile)) {
      return res.status(404).json({ error: "Template file not found" });
    }
    const content = import_fs2.default.readFileSync(templateFile, "utf-8");
    const template = TEMPLATES_LIBRARY[templateId];
    const filename = template?.file || `${templateId}.gd`;
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(content);
  } catch (error) {
    console.error("Download failed:", error);
    res.status(500).json({ error: "Failed to download template" });
  }
});
app.get("/api/enemies/template/:type", (req, res) => {
  try {
    const { type } = req.params;
    if (type !== "zombie" && type !== "ranged" && type !== "spawner") {
      return res.status(400).json({ error: "Invalid enemy type" });
    }
    const template = getEnemyTemplate(type);
    res.json({ template });
  } catch (error) {
    console.error("Failed to get enemy template:", error);
    res.status(500).json({ error: "Failed to get enemy template" });
  }
});
app.post("/api/enemies/generate", async (req, res) => {
  try {
    const { enemyType, customVars, selectedFunctions, enhancementPrompt } = req.body;
    if (!enemyType || !Array.isArray(selectedFunctions)) {
      return res.status(400).json({ error: "Invalid request" });
    }
    const template = getEnemyTemplate(enemyType);
    let code = applyVarsToTemplate(template, customVars || {});
    code = selectiveFunctions(template, new Set(selectedFunctions));
    if (enhancementPrompt && enhancementPrompt.trim()) {
      code = await generateEnemyAIScript(code, selectedFunctions, enhancementPrompt);
    } else if (selectedFunctions.length < template.functions.length) {
      code = await generateEnemyAIScript(code, selectedFunctions);
    }
    res.json({ code });
  } catch (error) {
    console.error("Enemy generation failed:", error);
    res.status(500).json({ error: "Failed to generate enemy script" });
  }
});
app.get("/api/vehicles/template/:type", (req, res) => {
  try {
    const { type } = req.params;
    if (type !== "car") {
      return res.status(400).json({ error: "Invalid vehicle type" });
    }
    const template = getVehicleTemplate(type);
    res.json({ template });
  } catch (error) {
    console.error("Failed to get vehicle template:", error);
    res.status(500).json({ error: "Failed to get vehicle template" });
  }
});
app.post("/api/vehicles/generate", async (req, res) => {
  try {
    const { vehicleType, customVars, selectedFunctions, enhancementPrompt } = req.body;
    if (!vehicleType || !Array.isArray(selectedFunctions)) {
      return res.status(400).json({ error: "Invalid request" });
    }
    const template = getVehicleTemplate(vehicleType);
    let code = applyVarsToTemplate2(template, customVars || {});
    code = selectiveFunctions2(template, new Set(selectedFunctions));
    if (enhancementPrompt && enhancementPrompt.trim()) {
      code = await generateVehicleAIScript(code, selectedFunctions, enhancementPrompt);
    } else if (selectedFunctions.length < template.functions.length) {
      code = await generateVehicleAIScript(code, selectedFunctions);
    }
    res.json({ code });
  } catch (error) {
    console.error("Vehicle generation failed:", error);
    res.status(500).json({ error: "Failed to generate vehicle script" });
  }
});
app.post("/api/node/generate", async (req, res) => {
  try {
    const { nodeId, nodeType, nodeCategory, nodeDescription, properties, prompt } = req.body;
    let gdscriptCode = "";
    const aiPrompt = `Generate clean, production-ready GDScript code for a Godot 4.4 ${nodeType} node.

Node Type: ${nodeType}
Category: ${nodeCategory}
Description: ${nodeDescription}

Properties to configure:
${Object.entries(properties || {}).map(([key, value]) => `- ${key}: ${value}`).join("\n")}

${prompt ? `
User Request: ${prompt}` : "Generate standard initialization code."}

Return ONLY valid GDScript code, no explanations.`;
    if (process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY) {
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: aiPrompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500
            }
          })
        });
        const data = await response.json();
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          gdscriptCode = data.candidates[0].content.parts[0].text.trim();
          gdscriptCode = gdscriptCode.replace(/^```gdscript\n?|```$/g, "").trim();
        }
      } catch (error) {
        console.warn("AI generation failed, using fallback:", error);
        gdscriptCode = generateFallbackCode(nodeType, properties);
      }
    } else {
      gdscriptCode = generateFallbackCode(nodeType, properties);
    }
    res.json({
      code: gdscriptCode,
      nodeId,
      nodeType
    });
  } catch (error) {
    console.error("Node code generation error:", error);
    res.status(500).json({ error: "Failed to generate node code" });
  }
});
function generateFallbackCode(nodeType, properties) {
  let code = `# ${nodeType} node
`;
  Object.entries(properties || {}).forEach(([key, value]) => {
    if (value !== void 0 && value !== "") {
      code += `${key} = ${value}
`;
    }
  });
  code += `
func _ready():
	print("${nodeType} initialized")
`;
  return code;
}
app.get("/api/godot/nodes", (req, res) => {
  try {
    const { category, search } = req.query;
    let nodes = GODOT_NODES_DATABASE;
    if (search && typeof search === "string") {
      nodes = searchNodes(search);
    } else if (category && typeof category === "string") {
      nodes = getNodesByCategory(category);
    }
    res.json({
      nodes,
      total: nodes.length,
      categories: [...new Set(GODOT_NODES_DATABASE.map((n) => n.category))]
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch nodes" });
  }
});
app.post("/api/ai/generate-code", async (req, res) => {
  try {
    const { prompt, provider, model } = req.body;
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const { generateWithIntelligentFallback: generateWithIntelligentFallback2 } = await Promise.resolve().then(() => (init_ai_fallback_enhanced(), ai_fallback_enhanced_exports));
    const result = await generateWithIntelligentFallback2(prompt, {
      retries: 2,
      timeout: 45e3,
      preferProvider: provider || "gemini"
    });
    res.json({
      code: result.code,
      provider: result.provider,
      model: result.model,
      fallbackUsed: result.fallbackUsed
    });
  } catch (error) {
    console.error("AI code generation failed:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to generate code"
    });
  }
});
app.post("/api/blocks/generate", async (req, res) => {
  try {
    const sequence = req.body;
    if (!sequence.blocks || sequence.blocks.length === 0) {
      return res.status(400).json({ error: "At least one block is required" });
    }
    console.log("[Blocks] Generating code for:", summarizeBlockSequence(sequence));
    const baseCode = await generateBlockCode(sequence);
    console.log("[Blocks] Base code generated, length:", baseCode.length);
    const prompt = buildBlockSequencePrompt(sequence, baseCode);
    const { generateWithIntelligentFallback: generateWithIntelligentFallback2 } = await Promise.resolve().then(() => (init_ai_fallback_enhanced(), ai_fallback_enhanced_exports));
    const result = await generateWithIntelligentFallback2(prompt, {
      retries: 2,
      timeout: 45e3,
      preferProvider: "gemini"
    });
    console.log(`[Blocks] AI refinement successful with ${result.provider} (${result.model})`);
    const finalCode = ensureValidGDScript(result.code);
    res.json({
      code: finalCode,
      provider: result.provider,
      model: result.model,
      fallbackUsed: result.fallbackUsed,
      note: "Block sequence converted and refined with AI"
    });
  } catch (error) {
    console.error("Block generation failed:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to generate block code"
    });
  }
});
app.post("/api/flowchart/templates", async (req, res) => {
  try {
    const { name, description, nodes, edges } = req.body;
    if (!name || !nodes || !edges) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    res.json({
      success: true,
      message: "Template saved successfully",
      template: { name, description, nodes, edges }
    });
  } catch (error) {
    console.error("Template save failed:", error);
    res.status(500).json({ error: "Failed to save template" });
  }
});
app.use(import_express.default.static(import_path2.default.join(__dirname2, "../dist/public")));
app.get("*", (req, res) => {
  res.sendFile(import_path2.default.join(__dirname2, "../dist/public/index.html"));
});
var server = app.listen(PORT, () => {
  console.log(`[Flowchart GDScript Generator] Running on http://localhost:${PORT}`);
});
var index_default = server;
/*! Bundled license information:

media-typer/index.js:
  (*!
   * media-typer
   * Copyright(c) 2014 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

type-is/index.js:
  (*!
   * type-is
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2014-2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
