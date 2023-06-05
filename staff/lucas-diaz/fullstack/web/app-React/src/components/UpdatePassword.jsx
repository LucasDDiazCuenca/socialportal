import updateUserPassword from "../logic/updateUserPassword.js"
import { context } from "../ui.js";
import { useState } from "react";
import Form from "./library/Form.jsx";

export default function UpdatePassword(props) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleUpdatePassword(event) {
        event.preventDefault();
        try {
            const oldPassword = event.target.elements["old-password"].value
            const newPassword = event.target.elements["new-password"].value
            const newPasswordRepetition = event.target.elements["new-password-repetition"].value

            updateUserPassword(context.userId, oldPassword, newPassword, newPasswordRepetition, error => {
                if(error){
                    setErrorMessage(error.message)
                    return;
                }
                props.onUpdatedPassword();
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
        <h3>UPDATE PASSWORD</h3>
        <p>To change current password, provide a new one</p>
        <Form onSubmit={handleUpdatePassword}>
            <label htmlFor="old-password">Old password: </label>
            <input type="text" className="old-password form-item" name="old-password" placeholder="Enter old password"
                autoComplete="current-password" />
            <label htmlFor="new-password">New password:</label>
            <input type="password" className="new-password form-item" name="new-password" placeholder="Enter new password"
                id="new-password" autoComplete="current-password" />
            <label htmlFor="new-password-repetition">Repeat new password:</label>
            <input type="password" className="new-password-repetition form-item" name="new-password-repetition"
                placeholder="Enter again new password" id="new-password-repetition" autoComplete="current-password" />
            {errorMessage && <p className="fail-password-match-advise basis-full text-center red">{errorMessage}</p>}
            <div className="form-buttons">
                <button className="form-button" onClick={handleCancelClick}>Cancel</button>
                <button type="submit" className="form-button">Change password</button>
            </div>
        </Form>
    </div>

}