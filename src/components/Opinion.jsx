import { useFormContext } from "../store/opinions-context";
import { useActionState, useOptimistic } from "react";
export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const {
    upvoteOpinion,
    downvoteOpinion
  } = useFormContext();
  
  const upvoteAction = async ()=>{
    setModeOnAction('up')
    await upvoteOpinion(id)
  }
  const downvoteAction = async ()=>{
    setModeOnAction('down')
    await downvoteOpinion(id)
  }

  const [currentVote, setModeOnAction] = useOptimistic(votes, 
    (prev, mode)=>{
     return mode === 'up' ? prev + 1 : prev - 1;
    }
  )

  const [currentUpvoteState, formUpvoteAction, isPendingUpvote] = useActionState(upvoteAction)
  const [currentDownvoteState, formDownvoteAction, isPendingDownvote] = useActionState(downvoteAction)
  
  
  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={formUpvoteAction} disabled={isPendingDownvote || isPendingUpvote}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{currentVote}</span>

        <button formAction={formDownvoteAction} disabled={isPendingDownvote || isPendingUpvote}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
