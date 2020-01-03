const services = {
    ViranomaisPaluukanavaService: {
        ViranomaisPaluukanavaPort: {
            VieKohdeTiloja: (args) => {
                console.log(JSON.stringify(args));
            }
        }
    }
};

module.exports = services;