# insomnia-plugin-timestamp-expander

Simple plugin for insomnia that tries to spot timestamp and add them to response as iso strings.

I was fed up with seeing timestamps that made no sense to me!
This plugin tries to spot timestamps in json output and add a new property with the timestamp as an ISO string.

At the moment, it only really works on json output. 🤷

## What does it actually do!?

When it spots a 10 or 13 char timestamp, it will parse it into a date object.  
It will then add an extra property, after the triggering property, where it writes the date as ISO String.  
The new property name will be the name of the triggering property, with `_as_datetime` appended to it.  

### Example

Here is a short example of what actually happens in your response.

Original json:

```json
{
    "created_at": 1663846167
}
```

Modified by plugin:

```json
{
    "created_at": 1663846167,
    "created_at_as_datetime": "2022-09-22T11:29:27.000Z"
}
```
