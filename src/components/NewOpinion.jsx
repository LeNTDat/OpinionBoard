import { useActionState } from "react";

export function NewOpinion() {
  const onSubmitAction = (prev, fromData)=>{
    const data = Object.fromEntries(fromData.entries())
    const {title, userName, body} = data;
    let errors = {};

    if(!title){
      errors.title = true
    }

    if(!userName){
      errors.userName = true
    }

    if(!body){
      errors.body = true
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
            <label  title="Enter the UserName please" htmlFor="userName">Your Name</label>
            <input required ={formState?.errors?.userName} title="Enter the UserName please" type="text" id="userName" name="userName" />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input required ={formState?.errors?.title} type="text" id="title" name="title" />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea required ={formState?.errors?.body} id="body" name="body" rows={5}></textarea>
        </p>

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
