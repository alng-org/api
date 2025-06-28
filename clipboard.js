/**
 * a copy function
 * @param e_text a string for copy
 * @returns Resolved value of Promise is e_text when it finished, but not sure successful
 */
function ctrl_c(e_text = ""){
    return new Promise(
        (resolve,_)=>{
            if(navigator.clipboard !== undefined){
                navigator.clipboard.writeText(e_text);
                resolve(e_text);
            }else{
                let tmp_e = document.createTextNode(e_text);
                document.body.append(tmp_e);
                let selection = window.getSelection();
                let old_range = new Range();
                try {
                    old_range = selection.getRangeAt(0).cloneRange();
                    selection.getRangeAt(0).selectNodeContents(tmp_e);
                    document.execCommand("copy");
                    resolve(e_text);
                }
                finally{
                    selection.removeAllRanges();
                    selection.addRange(old_range);
                    tmp_e.remove();
                }
            }
        }
    )
}
/**
 * A paste function
 * @param prompt prompt for user paste action
 * @returns Resolved value of Promise is the string read from the clipboard
 */
function ctrl_v(prompt = "press Ctrl + V") {
    return new Promise(
        (resolve,_) => resolve(
            (navigator.clipboard?.readText()) ?? (
                new Promise(
                    (f,_) => {
                        document.addEventListener(
                            "paste",
                            (e) => f( (e.clipboardData?.getData("text")) ?? (``) ),
                            {once:true}
                        );
                       alert(prompt);
                    }
                )
            )
        )
    );
}