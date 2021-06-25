/*
  Definition
*/
  const checkFields = (required, data) => {
    const miss = []

    // Check missing fields
    required.forEach((prop) => {
      if (!(prop in data)) miss.push(prop)
    })
  
    // Set service state
    const ok = miss.length === 0
      
    // Return service state
    return { ok, miss }
  };
// 


/*
  Export fonctions
*/
  module.exports = {
    checkFields
  };
//