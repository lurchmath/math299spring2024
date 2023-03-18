////////////////////////////////////////////////////////////////////
// Peano Test Proofs
// 

{ // wrap them all
  
(<<< "Peano Axiom Proofs")

{
  (<<< "Theorem: 1+1=2")
  { (= (+ 1 1) 2) }
  
  (<<< "Proof:")
  {  
    (<<< "Necessary BIHs:")
    { :(= 1 (𝜎 0)) :(= (+ 1 1) (+ 1 1)) (= (+ 1 1) (+ 1 (𝜎 0))) } <<
    { :(= (+ 1 (𝜎 0)) (𝜎 (+ 1 0))) :(= (+ 1 1) (+ 1 (𝜎 0))) 
      (= (+ 1 1) (𝜎 (+ 1 0)) )
    } <<
    { :(= (+ 1 0) 1) :(= (+ 1 1) (𝜎 (+ 1 0)) ) (= (+ 1 1) (𝜎 1) ) } <<
    { :(= (𝜎 1) 2) :(= (+ 1 1) (𝜎 1) ) (= (+ 1 1) 2 ) } <<
    { :(= 2 (𝜎 1)) :(= 2 2) (= (𝜎 1) 2) } <<
    (<<< "the actual proof:") 
    (= (+ 1 1) (+ 1 1))
    (= (+ 1 1) (+ 1 (𝜎 0)))
    (= (+ 1 1) (𝜎 (+ 1 0)) )
    (= (+ 1 1) (𝜎 1) )
    (= (+ 1 1) 2 )
  }  
}

{
  (<<< "Theorem 7.2: n≠0 ⇒ ∃m,n=𝜎(m)")
  { :(¬ (= n 0)) (∃ m, (= n (𝜎 m))) }

  (<<< "Proof:")
  { :(¬ (= n 0))
    (<<< "P(n) is n≠0⇒∃k,n=𝜎(m)")
    (<<< "Base Case")
    { :(¬ (= 0 0))
      { :(¬ (∃ m, (= 0 (𝜎 m))))
        (= 0 0)
        →←
      }
      (∃ m, (= 0 (𝜎 m)))
    }
    (⇒ (¬ (= 0 0)) (∃ m, (= 0 (𝜎 m))) )
    (<<< "Inductive step")
    { :[k]
      { :(⇒ (¬ (= k 0)) (∃ m, (= k (𝜎 m))) )
        { :(¬ (= (𝜎 k) 0)) 
          (= (𝜎 k) (𝜎 k))
          (∃ m, (= (𝜎 k) (𝜎 m)))
        }
        (⇒ (¬ (= (𝜎 k) 0)) (∃ m, (= (𝜎 k) (𝜎 m))))
      } 
    }
    (<<< "It would be nice to avoid the need for ∀ and ⇒ in this proof.")
    (<<< "But (@ P n) only matches expressions")
    (∀ j , (⇒ (¬ (= j 0)) (∃ m, (= j (𝜎 m)))))
    (⇒ (¬ (= n 0)) (∃ m, (= n (𝜎 m))))
    (∃ m, (= n (𝜎 m)))
  }
}

{
  (<<< "Theorem 7.3: n≠𝜎(n)")
  { (¬ (= n (𝜎 n))) }

  (<<< "Proof:")
  { 
    (<<< "Base Case:")
    (¬ (= 0 (𝜎 0)))
    
    (<<< "Inductive step:")
    { :[k]
      { :(¬ (= k (𝜎 k)))
        { :(= (𝜎 k) (𝜎 (𝜎 k)))
          (= k (𝜎 k))
          →←
        }
        (¬ (= (𝜎 k) (𝜎 (𝜎 k))) )
      }
    }
    (∀ j, (¬ (= j (𝜎 j))))
    (¬ (= n (𝜎 n)))
  }
}

{
  (<<< "Theorem 7.4: 𝜎(n)=n+1")
  { (= (𝜎 n) (+ n 1)) }

  (<<< "Proof:")
  { 
    (<<< "Necessary BIHs")
    { :(= (+ n 0) n ) :(= (𝜎 (+ n 0)) (𝜎 (+ n 0)) ) 
      (= (𝜎 n) (𝜎 (+ n 0))) } <<
    { :(= (+ n (𝜎 0)) (𝜎 (+ n 0)) )  :(= (+ n (𝜎 0)) (+ n (𝜎 0)) )
      (= (𝜎 (+ n 0)) (+ n (𝜎 0)) ) } <<     
    { :(= (𝜎 (+ n 0)) (+ n (𝜎 0)) )  :(= (𝜎 n) (𝜎 (+ n 0)))
      (= (𝜎 n) (+ n (𝜎 0))) } <<
    { :(= 1 (𝜎 0) ) :(= 1 1) (= (𝜎 0) 1 ) } <<  
    { :(= (𝜎 0) 1 ) :(= (𝜎 n) (+ n (𝜎 0)))
      (= (𝜎 n) (+ n 1)) } <<
    (<<< "the actual proof (not needed because the BIHs do all the work)")
    (<<< "(= (𝜎 n) (𝜎 (+ n 0)))")
    (<<< "(= (𝜎 n) (+ n (𝜎 0)))")
    (<<< "(= (𝜎 n) (+ n 1))    ")
  }
}

{
  (<<< "Theorem 7.5: Associativity of Addition")
  { (= (+ (+ m n) p) (+ m (+ n p)) ) }

  (<<< "Proof: (by induction on p for arbitrary m,n")
  { 
    (<<< "Base case:")
    { :(= (+ n 0) n) 
      :(= (+ (+ m n) 0) (+ m n))
      (= (+ (+ m n) 0) (+ m (+ n 0))) 
    } <<
    (<<< "Inductive step:")
    { :[k]
      :(= (+ (+ m n) k) (+ m (+ n k)) )
      { :(= (+ (+ m n) k) (+ m (+ n k)) )
        :(= (+ (+ m n) (𝜎 k)) (𝜎 (+ (+ m n) k)))
        (= (+ (+ m n) (𝜎 k)) (𝜎 (+ m (+ n k))))
      } <<
      { :(= (+ m (𝜎 (+ n k))) (𝜎 (+ m (+ n k))))
        :(= (+ (+ m n) (𝜎 k)) (𝜎 (+ m (+ n k))))
        (= (+ (+ m n) (𝜎 k)) (+ m (𝜎 (+ n k))))
      } <<
      { :(= (+ n (𝜎 k)) (𝜎 (+ n k)))
        :(= (+ (+ m n) (𝜎 k)) (+ m (𝜎 (+ n k))))
        (= (+ (+ m n) (𝜎 k)) (+ m (+ n (𝜎 k))))
      } <<
    }
    (<<< "Therefore, by induction")
    (∀ p, (= (+ (+ m n) p) (+ m (+ n p)) ))
  }
}
// end of all
} ✔︎
