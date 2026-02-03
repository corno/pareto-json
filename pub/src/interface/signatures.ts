import * as _pi from 'pareto-core/dist/interface'

import * as d_out from "pareto-fountain-pen/dist/interface/to_be_generated/text"

export namespace deserializers {

    export namespace primitives {

        export namespace approximate_number {

            export type scientific_notation = _pi.Refiner_With_Parameters<number, string, d_out.Text, { 'digits': number }>

        }

        export namespace integer {
            export type fractional_decimal = _pi.Refiner_With_Parameters<number, string, d_out.Text, { 'number of fractional digits': number }>

        }

        export namespace boolean {

            export type true_false = _pi.Refiner<boolean, string, d_out.Text>

        }
    }
}


export namespace serializers {

    export namespace primitives {

        export namespace approximate_number {

            export type scientific_notation = _pi.Transformer_With_Parameters<number, d_out.Text, { 'digits': number }>

        }

        export namespace integer {

            export type fractional_decimal = _pi.Transformer_With_Parameters<number, d_out.Text, { 'number of fractional digits': number }>
        }

        export namespace boolean {

            export type true_false = _pi.Transformer<boolean, d_out.Text>

        }

        export namespace text {


        }
    }
}