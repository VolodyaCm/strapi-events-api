const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
var jf = require('jsonfile')
const Blob = require("cross-blob");
const moment = require('moment');

module.exports = {
  async createMany(ctx) {
    const stringArrayBuffer = ctx.request.body.file;
    const buf = Buffer.from(stringArrayBuffer.split(','))
    const content = JSON.parse(buf.toString());

    const all = await Promise.all(content.events.map((event) => {
      console.log(event.date);
      console.log( moment(event.date).format('yyyy-MM-DD'));
      return strapi.services.events.create({
        ...event,
        date: moment(event.date).format('yyyy-MM-DD')
      });
    }));

    return all.map(entity => sanitizeEntity(entity, { model: strapi.models.events }))
  },
};
