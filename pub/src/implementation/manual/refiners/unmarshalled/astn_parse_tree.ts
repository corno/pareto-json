import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_function from "../../../../interface/to_be_generated/unmarshall"
import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

import * as d_astn_unmarshalled from "astn-core/dist/interface/to_be_generated/unmarshalled"

//dependencies
import * as r_astn_unmarshalled_from_parse_tree from "astn-core/dist/implementation/manual/refiners/unmarshalled/parse_tree"
import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"
import * as r_primitives_from_loc from "../primitives/list_of_characters"
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

export const Array = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>,
) => {
    return r_astn_unmarshalled_from_parse_tree.List(
        $,
        ($) => abort(['astn', $]),
    )
}

export const Boolean = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>,
): boolean => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($): boolean => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'text': return _p.ss($, ($) => {
                        const text_value = $
                        return _p.decide.state($.type, ($) => {
                            switch ($[0]) {
                                case 'undelimited': return _p.ss($, ($) => text_value.value === "true"
                                    ? true
                                    : text_value.value === "false"
                                        ? false
                                        : abort(['json', {
                                            'type': ['not a boolean', null],
                                            'range': t_astn_parse_tree_to_location.Value(value),
                                        }])
                                )
                                default: return abort(['json', {
                                    'type': ['not a boolean', null],
                                    'range': t_astn_parse_tree_to_location.Value(value),
                                }])
                            }
                        })
                    })
                    default: return abort(['json', {
                        'type': ['not a boolean', null],
                        'range': t_astn_parse_tree_to_location.Value(value),
                    }])
                }
            }))
            default: return abort(['json', {
                'type': ['not a boolean', null],
                'range': t_astn_parse_tree_to_location.Value(value),
            }])
        }
    })
}

export const Null = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>,
): null => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($): null => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'text': return _p.ss($, ($) => {
                        const text_value = $
                        return _p.decide.state($.type, ($) => {
                            switch ($[0]) {
                                case 'undelimited': return _p.ss($, ($) => text_value.value === "null"
                                    ? null
                                    : abort(['json', {
                                        'type': ['not a null', null],
                                        'range': t_astn_parse_tree_to_location.Value(value),
                                    }])
                                )
                                default: return abort(['json', {
                                    'type': ['not a null', null],
                                    'range': t_astn_parse_tree_to_location.Value(value),
                                }])
                            }
                        })
                    })
                    default: return abort(['json', {
                        'type': ['not a null', null],
                        'range': t_astn_parse_tree_to_location.Value(value),
                    }])
                }
            }))
            default: return abort(['json', {
                'type': ['not a null', null],
                'range': t_astn_parse_tree_to_location.Value(value),
            }])
        }
    })
}

export const Number = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>,
): number => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'text': return _p.ss($, ($) => {
                        const text_value = $
                        return _p.decide.state($.type, ($) => {
                            switch ($[0]) {
                                case 'undelimited': return _p.ss($, ($) => r_primitives_from_loc.Float(
                                    _p_list_from_text(
                                        text_value.value,
                                        ($) => $,
                                    ),
                                    () => abort(['json', {
                                        'type': ['not a number', null],
                                        'range': t_astn_parse_tree_to_location.Value(value),
                                    }]),
                                    { 'digits': 10 }
                                ))
                                default: return abort(['json', {
                                    'type': ['not a number', null],
                                    'range': t_astn_parse_tree_to_location.Value(value),
                                }])
                            }
                        })
                    })
                    default: return abort(['json', {
                        'type': ['not a number', null],
                        'range': t_astn_parse_tree_to_location.Value(value),
                    }])
                }
            }))
            default: return abort(['json', {
                'type': ['not a number', null],
                'range': t_astn_parse_tree_to_location.Value(value),
            }])
        }
    })
}

export const ObjectX = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>,
) => {
    const properties = r_astn_unmarshalled_from_parse_tree.Dictionary(
        $,
        ($) => abort(['astn', $]),
    )

    return properties
}

export const Object_Static = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>,
    $p: {
        'expected properties': _pi.Dictionary<null>
    }
) => {
    const dictionary = r_astn_unmarshalled_from_parse_tree.Dictionary(
        $,
        ($) => abort(['astn', $]),
    )

    const unexpected_properties = _p.dictionary.from.dictionary(
        _p.dictionary.from.dictionary(
            dictionary.entries,
        ).join(
            $p['expected properties'],
            ($, other, id): _pi.Optional_Value<d_location.Range> => _p.decide.optional(
                other,
                () => _p.optional.literal.not_set(),
                () => _p.optional.literal.set($.id.range)
            )
        )
    ).filter(
        ($) => $
    )

    if (unexpected_properties.__get_number_of_entries() > 0) {
        return abort(['json', {
            'type': ['unexpected properties', unexpected_properties],
            'range': t_astn_parse_tree_to_location.Value($),
        }])
    }

    return dictionary
}

export const Optional_Null = (
    $: d_in.Value,
): _pi.Optional_Value<d_in.Value> => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'text': return _p.ss($, ($) => {
                        const text_value = $
                        return _p.decide.state($.type, ($) => {
                            switch ($[0]) {
                                case 'undelimited': return _p.ss($, ($) => text_value.value === "null"
                                    ? _p.optional.literal.not_set()
                                    : _p.optional.literal.set(value)
                                )
                                default: return _p.optional.literal.set(value)
                            }
                        })
                    })
                    default: return _p.optional.literal.set(value)
                }
            }))
            default: return _p.optional.literal.set(value)
        }
    })
}

export const Property = (
    $: d_astn_unmarshalled.Dictionary,
    abort: _pi.Abort<d_function.Error>,
    $p: {
        'id': string
    }
) => {
    const dict = $
    return $.entries.__get_entry_deprecated(
        $p.id,
        {
            no_such_entry: ($) => abort(['json', {
                'type': ['missing property', $p.id],
                'range': t_astn_parse_tree_to_location.Value(dict.value),
            }])
        }
    ).value.__decide(
        ($) => $.value,
        () => abort(['json', {
            'type': ['missing property', $p.id],
            'range': t_astn_parse_tree_to_location.Value(dict.value),
        }])
    )
}

export const String = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>,
) => {
    const xxx = r_astn_unmarshalled_from_parse_tree.Text(
        $,
        ($) => abort(['astn', $]),
    )
    if (xxx.type[0] !== 'quoted') {
        return abort(['json', {
            'type': ['not a string', null],
            'range': t_astn_parse_tree_to_location.Value($),
        }])
    }
    return xxx.value
}

