import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

import * as d_in from "../../../../interface/to_be_generated/json_with_parse_info"
import * as d_in_location from "astn-core/dist/interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/to_be_generated/json_x"
import * as d_function from "../../../../interface/to_be_generated/unmarshalled_from_json"
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

export const Object_With_Unique_Keys: _pi.Refiner<
    d_out.Object_With_Unique_Keys,
    d_function.Error,
    d_in.Object
> = ($, abort) => {
    const object = $

    const found_properties = _p.dictionary.from.list(
        object.entries
    ).group(
        ($) => $.key.token.value
    ).__d_map(
        ($, id) => _p.decide.list(
            $
        ).has_single_item(
            ($) => $,
            ($) => abort({
                'type': ['multiple properties with this key', id],
                'range': object.dictionary['{'].range,
            }),
            () => _p_unreachable_code_path("the list is the result of a 'group' operation, it cannot be empty")
        )
    )

    return {
        'properties': found_properties,
        'range': object.dictionary['{'].range
    }
}