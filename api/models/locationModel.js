import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LocationSchema = new Schema( {
    streetAddress: {
        type: String,
        maxLength: 150,
        required: true,
    },

    neighborhood: {
        type: String,
        maxLength: 50,
        required: true,
    },

    city: {
        type: "string",
        required: true,
        enum: [
            "SOROCABA",
            "ITU",
            "SALTO DE PIRAPORA",
            "SÃO ROQUE",
            "IPERÓ",
            "CAPELA DO ALTO",
            "VOTORANTIM",
            "ARAÇOIABA DA SERRA",
            "BOITUVA",
            "CERQUILHO",
            "TATUÍ"
        ]
    },

    state: {
        type: String,
        default: "SP"
    },

    CEP: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 9,
        validate: {
            validator: function(value) {
                return /^\d{5}-\d{3}$/.test(value);
            },
            message: props => `${props.value} is not a valid CEP format. Use "XXXXX-XXX".`
        },
    },

    country: {
        type: String,
        default: "BRAZIL",
    }

} );

export default mongoose.model( "Location", LocationSchema );