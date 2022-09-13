class Info {
    constructor() {
        this.demostracion = '';
        this.data = {
            args: process.argv,
            platform: process.platform,
            version: process.version,
            path: process.execPath,
            id: process.pid,
            folder: process.cwd(),
            rss: process.memoryUsage().rss,
        }
    }
    async ForLoop() {
        for (let index = 0; index < 10000; index++) {
            this.demostracion += 'Test prueba';
        }
        return this.demostracion
    }
    
    async DataProject() {
        return this.data
    }
}

module.exports = Info