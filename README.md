
# Electromon
Nodemon for Electron

To install:
```
npm i -g electromon
```

Go into a electron project and run ```electromon ./YOUR_FILE_HERE```
This will Start Live Reload on that project

### To ignore certain files
create a file in your project called .electromonrc and write your ignore regex ```(node_modules|plugins|etc)```
### To Restart
When Electromon is running type ```rs``` and hit enter