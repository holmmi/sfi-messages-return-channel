const select = require('xml-crypto').xpath;
const dom = require('xmldom').DOMParser;
const SignedXml = require('xml-crypto').SignedXml;
const FileKeyInfo = require('xml-crypto').FileKeyInfo;

function verifyXmlSignature(xml) {
    let doc = new dom().parseFromString(xml);
    let signature = select(doc, "/*/*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
    
    let sig = new SignedXml();
    sig.keyInfoProvider = new FileKeyInfo('./certs/qat.integraatiopalvelu.fi_VRK_CA_for_Service_Providers_G3_.cer');
    sig.loadSignature(signature);
    return sig.checkSignature(xml);
}

module.exports.verifyXmlSignature = verifyXmlSignature;