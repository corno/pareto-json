import * as _pa from 'exupery-core-alg'
import * as _pd from 'exupery-core-dev'

import * as _i_generic from "../../generic/unmarshall"
import * as _i_out from "../../../interface/schemas/json/data_types/unconstrained"
import * as _i_signatures from "../../../interface/schemas/json/unmarshall"


export const Document: _i_signatures._T_Document = ($, $p) => Value(
    $,
    {
        'value deserializers': $p['value deserializers'],
    }
)
export const Value: _i_signatures._T_Value = ($, $p) => _i_generic.process_state_group(
    $,
    {
        'states': _pa.dictionary_literal({
            'array': ($): _i_out._T_Value => _i_generic.wrap_unconstrained_state_group(
                ['array', _i_generic.process_unconstrained_list(
                    $,
                    {
                        'value': ($) => Value(
                            $,
                            {
                                'value deserializers': $p['value deserializers'],
                            }
                        ),
                    }
                )],
                null
            ),
            'boolean': ($): _i_out._T_Value => _i_generic.wrap_unconstrained_state_group(
                ['boolean', _i_generic.process_boolean(
                    $,
                    {
                        'deserializer': $p['value deserializers']['boolean'],
                    }
                )],
                null
            ),
            'null': ($): _i_out._T_Value => _i_generic.wrap_unconstrained_state_group(
                ['null', _i_generic.process_nothing(
                    $,
                    null
                )],
                null
            ),
            'number': ($): _i_out._T_Value => _i_generic.wrap_unconstrained_state_group(
                ['number', _i_generic.process_state_group(
                    $,
                    {
                        'states': _pa.dictionary_literal({
                            'float': ($): _i_out._T_Value.SG._number => _i_generic.wrap_unconstrained_state_group(
                                ['float', _i_generic.process_number(
                                    $,
                                    {
                                        'deserializer': $p['value deserializers']['default number'],
                                    }
                                )],
                                null
                            ),
                            'integer': ($): _i_out._T_Value.SG._number => _i_generic.wrap_unconstrained_state_group(
                                ['integer', _i_generic.process_number(
                                    $,
                                    {
                                        'deserializer': $p['value deserializers']['default number'],
                                    }
                                )],
                                null
                            ),
                        }),
                    }
                )],
                null
            ),
            'object': ($): _i_out._T_Value => _i_generic.wrap_unconstrained_state_group(
                ['object', _i_generic.process_state_group(
                    $,
                    {
                        'states': _pa.dictionary_literal({
                            'dictionary': ($): _i_out._T_Value.SG._object => _i_generic.wrap_unconstrained_state_group(
                                ['dictionary', _i_generic.process_unconstrained_dictionary(
                                    $,
                                    {
                                        'value': ($) => Value(
                                            $,
                                            {
                                                'value deserializers': $p['value deserializers'],
                                            }
                                        ),
                                    }
                                )],
                                null
                            ),
                            'key value array': ($): _i_out._T_Value.SG._object => _i_generic.wrap_unconstrained_state_group(
                                ['key value array', _i_generic.process_unconstrained_list(
                                    $,
                                    {
                                        'value': ($) => _i_generic.process_group(
                                            $,
                                            {
                                                'properties': ($) => ({
                                                    'key': _pa.cc(_i_generic.get_entry(
                                                        $,
                                                        {
                                                            'key': "key",
                                                        }
                                                    ), ($) => _i_generic.process_text(
                                                        $,
                                                        null
                                                    )),
                                                    'value': _pa.cc(_i_generic.get_entry(
                                                        $,
                                                        {
                                                            'key': "value",
                                                        }
                                                    ), ($) => Value(
                                                        $,
                                                        {
                                                            'value deserializers': $p['value deserializers'],
                                                        }
                                                    )),
                                                }),
                                            }
                                        ),
                                    }
                                )],
                                null
                            ),
                        }),
                    }
                )],
                null
            ),
            'string': ($): _i_out._T_Value => _i_generic.wrap_unconstrained_state_group(
                ['string', _i_generic.process_text(
                    $,
                    null
                )],
                null
            ),
        }),
    }
)
