
import * as p_i from 'pareto-core/interface/__internal/Abort'
import * as p_di from 'pareto-core/interface/data'

export type Document_ = Value_

export namespace Value_ {
    
    export namespace array {
        
        export type L = Value_
        
    }
    
    export type array = p_di.List<array.L>
    
    export namespace object_ {
        
        export namespace L {
            
            export type key = string
            
            export type value = Value_
            
        }
        
        export type L = {
            readonly 'key': L.key
            readonly 'value': L.value
        }
        
    }
    
    export type object_ = p_di.List<object_.L>
    
    export namespace number_ {
        
        export type integer = number
        
        export type float = number
        
    }
    
    export type number_ = 
        | readonly ['integer', number_.integer]
        | readonly ['float', number_.float]
    
    export type string_ = string
    
    export type boolean_ = boolean
    
    export type null_ = null
    
}

export type Value_ = 
    | readonly ['array', Value_.array]
    | readonly ['object', Value_.object_]
    | readonly ['number', Value_.number_]
    | readonly ['string', Value_.string_]
    | readonly ['boolean', Value_.boolean_]
    | readonly ['null', Value_.null_]

export type { 
    Document_ as Document, 
    Value_ as Value, 
}
