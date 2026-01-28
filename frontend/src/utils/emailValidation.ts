
function isValidEmail(email: string): boolean {
  
    const parts = email.split("@");
    const [local, domain] = parts;
  
    // 3. @ must contain sth before @
    if (local.length === 0) return false;
  
    //  @ must contain.
    const domainParts = domain.split(".");
    if (domainParts.length < 2) return false;
  
    //  . ...@...
    if (domainParts.some(part => part.length === 0)) return false;
  
    return true;
  }


export function validateEmail(email:string): {valid: boolean; error?: string}{
    // Check for empty 
     if (!email.trim()){
       return {valid: false, error: "Email cannot be empty"};
     }
      // Check for spaces 
     if (email.includes(" ")){
       return {valid: false, error: "Email cannot contain spaces"};
     }
      // Check for multiple @ symbols 
     const atSymbolCount = (email.match(/@/g) || []).length; // find /@/  global
     if (atSymbolCount !== 1){
       return {valid: false, error: "Email must contain exactly one '@' symbol"};
     }
       // Check basic email format: something@something.something 
     if (!isValidEmail(email)){
       return {valid: false, error: "Email format is invalid"};
     }
       return {valid: true};
   }


    