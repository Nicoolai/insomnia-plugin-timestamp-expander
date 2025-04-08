// For help writing plugins, visit the documentation to get started:
//   https://docs.insomnia.rest/insomnia/introduction-to-plugins

const bufferToString = buf => buf.toString('utf-8');

const timeStampregex = /((["']([a-z0-9_-]+?)["']):([0-9]{10}|[0-9]{13}))([,}\s])/gi;

module.exports.responseHooks = [
    async ctx => {
        try {
            const contentType = ctx.response.getHeader("content-type");
            if (!contentType.toLowerCase().includes("application/json")) {
                return;
            }
            const body = bufferToString(await ctx.response.getBody());
            const newBody = body.replace(timeStampregex, (match, $1, $2, $3, $4, $5) => {
                try {
                    let d;
                    if ($4.length == 10) {
                        d = new Date($4 * 1000);
                    }
                    else if ($4.length == 13) {
                        d = new Date($4);
                    }
                    return `${$2}:${$4}, "${$3}_as_datetime":"${d.toISOString()}"${$5}`;
                }
                catch(ex) {
                    // Just fail silently if a value doesn't parse.
                    console.log(ex);
                }
            });

            ctx.response.setBody(newBody);
        } catch (exception) {
            console.log(exception);
        }
    }
]