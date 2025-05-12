import { useActionState } from "react";

export function NewOpinion() {
  const onSubmitAction = (prev, fromData)=>{
    const data = Object.fromEntries(fromData.entries())
    const {title, userName, body} = data;
    let errors = {};

    if(!title || !userName || !body){
      errors.errMessage = "Please enter the information !"
    }
    return {errors}
  }
  
  
  const [formState, formAction] = useActionState(onSubmitAction, {})
  
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName"/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5}></textarea>
        </p>
        <p className="errors">{formState?.errors?.errMessage}</p>

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
