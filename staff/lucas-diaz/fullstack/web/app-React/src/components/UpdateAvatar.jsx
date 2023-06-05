import { useState } from "react";
import updateUserAvatar from "../logic/updateUserAvatar";
import { context } from "../ui";
import Form from "./library/Form";


export default function UpdateAvatar(props) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleUpdateAvatar(event) {
        event.preventDefault();

        try {
            let url = event.target.url.value
            updateUserAvatar(context.userId, url, (error) => {
                if(error){
                    setErrorMessage(error.message)
                    return;
                }
                props.onUpdatedAvatar(url);
            });

        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    
    function handleCancelClick(event) {
        event.preventDefault();
        props.onCancelClick();
    }

    return <div className="flex flex-wrap flex-row justify-center basis-11/12 p-4 text-white gap-4 bg-zinc-800 rounded-lg">
        <h3>UPDATE AVATAR</h3>
        <p>To update avatar, please provide a link that contains an image .png or .jpeg</p>
        <Form  onSubmit={handleUpdateAvatar}>
            <label htmlFor="url">Avatar's URL: </label>
            <input type="url" className="avatar-url-input form-item" name="url" placeholder="Enter url" />
            <div className="form-buttons">
                { errorMessage &&  <p className="fail-warning basis-full text-center red">{errorMessage}</p>}
                <button className="form-button" onClick={handleCancelClick}>Cancel</button>
                <button type="submit" className="form-button">Update avatar</button>
            </div>
        </Form>
    </div>
}