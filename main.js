// For help writing plugins, visit the documentation to get started:
//   https://docs.insomnia.rest/insomnia/introduction-to-plugins

const bufferToJsonObj = buf => JSON.parse(buf.toString('utf-8'));
const jsonObjToBuffer = obj => Buffer.from(JSON.stringify(obj), 'utf-8');
const bufferToString = buf => buf.toString('utf-8');

const timeStampregex = /((["']([a-z0-9_-]+?)["']):([0-9]{10}|[0-9]{13}))([,}\s])/gi;

module.exports.responseHooks = [
    async ctx => {
        try {
            const body = bufferToString(ctx.response.getBody());
            const newBody = body.replace(timeStampregex, (match, $1, $2, $3, $4, $5) => {
                let d;
                if ($4.length == 10) {
                    d = new Date($4 * 1000);
                }
                else if ($4.length == 13) {
                    d = new Date($4);
                }
                return `${$2}:${$4}, "${$3}_as_datetime":"${d.toISOString()}"${$5}`;
              });

              ctx.response.setBody(newBody);
        } catch (exception) {
            console.log(exception);
        }
    }
]