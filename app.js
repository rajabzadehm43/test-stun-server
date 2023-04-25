import stun from 'stun'

const server = stun.createServer({ type: 'udp4' });

const { STUN_BINDING_RESPONSE, STUN_EVENT_BINDING_REQUEST } = stun.constants;
const userAgent = `node/${process.version} stun/v1.0.0`;

server.on(STUN_EVENT_BINDING_REQUEST, (request, rinfo) => {
    console.log('request: ', normalize(request), 'rinfo: ', normalize(rinfo))
    const message = stun.createMessage(STUN_BINDING_RESPONSE, request.transactionId);

    message.addXorAddress(rinfo.address, rinfo.port);
    message.addSoftware(userAgent);

    server.send(message, rinfo.port, rinfo.address);
    console.log('message: ', normalize(message))
});

server.listen(30125, () => {
    console.log('[stun] server started');
});

function normalize(object) {
    return JSON.parse(JSON.stringify(object))
}