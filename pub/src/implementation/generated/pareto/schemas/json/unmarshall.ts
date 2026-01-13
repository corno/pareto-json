    import * as _p from 'pareto-core-refiner'
    import * as _pdev from 'pareto-core-dev'
    
    import * as _i_generic from "../../generic/unmarshall"
    import * as _i_signatures from "../../../../../interface/generated/pareto/schemas/json/unmarshall"
    import * as _i_in from "../../../../../interface/generated/pareto/core/astn_source"
    import * as _i_out from "../../../../../interface/generated/pareto/schemas/json/data_types/target"
    
    
    export const Value: _i_signatures.Value_ = ($, $p) => _i_generic.process_unconstrained_state_group(
        $,
        {
            'states': _p.dictionary.literal({
                'array': ($): _i_out.Value_ => ['array', _i_generic.process_unconstrained_list(
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
                'object': ($): _i_out.Value_ => ['object', _i_generic.process_unconstrained_state_group(
                    $,
                    {
                        'states': _p.dictionary.literal({
                            'key value array': ($): _i_out.Value_._object => ['key value array', _i_generic.process_unconstrained_list(
                                $,
                                {
                                    'value': ($) => _i_generic.process_group(
                                        $,
                                        {
                                            'properties': ($) => ({
                                                'key': _p.deprecated_cc(_i_generic.get_entry(
                                                    $,
                                                    {
                                                        'key': "key",
                                                    }
                                                ), ($) => _i_generic.process_text(
                                                    $,
                                                    null
                                                )),
                                                'value': _p.deprecated_cc(_i_generic.get_entry(
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
                            'dictionary': ($): _i_out.Value_._object => ['dictionary', _i_generic.process_unconstrained_dictionary(
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
                        }),
                    }
                )],
                'number': ($): _i_out.Value_ => ['number', _i_generic.process_unconstrained_state_group(
                    $,
                    {
                        'states': _p.dictionary.literal({
                            'integer': ($): _i_out.Value_._number => ['integer', _i_generic.process_number(
                                $,
                                {
                                    'deserializer': $p['value deserializers']['default number'],
                                }
                            )],
                            'float': ($): _i_out.Value_._number => ['float', _i_generic.process_number(
                                $,
                                {
                                    'deserializer': $p['value deserializers']['default number'],
                                }
                            )],
                        }),
                    }
                )],
                'string': ($): _i_out.Value_ => ['string', _i_generic.process_text(
                    $,
                    null
                )],
                'boolean': ($): _i_out.Value_ => ['boolean', _i_generic.process_boolean(
                    $,
                    {
                        'deserializer': $p['value deserializers']['boolean'],
                    }
                )],
                'null': ($): _i_out.Value_ => ['null', _i_generic.process_nothing(
                    $,
                    null
                )],
            }),
        }
    )
    export const Document: _i_signatures._T_Document = ($, $p) => Value(
        $,
        {
            'value deserializers': $p['value deserializers'],
        }
    )
