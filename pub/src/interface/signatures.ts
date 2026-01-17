import *as _pi from 'pareto-core-interface'

export namespace deserializers {

    export namespace primitives {

        export namespace approximate_number {

            export type scientific_notation = _pi.Number_Deserializer<string>

        }

        export namespace integer {
            export type fractional_decimal = _pi.Number_Deserializer_With_Parameters<string, { 'number of fractional digits': number }>

        }

        export namespace boolean {

            export type true_false = _pi.Boolean_Deserializer<string>

        }
    }
}


export namespace serializers {

    export namespace primitives {

        export namespace approximate_number {

            export type scientific_notation = _pi.Number_Serializer_With_Parameters<{ 'digits': number }>

        }

        export namespace integer {

            export type fractional_decimal = _pi.Number_Serializer_With_Parameters<{ 'number of fractional digits': number }>
        }

        export namespace boolean {

            export type true_false = _pi.Boolean_Serializer

        }

        export namespace text {


        }
    }
}