import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "../_internals/kcClsx";
import type { UserProfileFormFieldsProps } from "../UserProfileFormFieldsProps";
import type { PageProps } from "./PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

type LoginUpdateProfileProps = PageProps<Extract<KcContext, { pageId: "login-update-profile.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};
import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page(props: { kcContext: KcContext }) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messagesPerField, url, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayRequiredFields
            headerNode={msg("loginProfileTitle")}
            displayMessage={messagesPerField.exists("global")}
        >
            <form id="kc-update-profile-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input
                            disabled={!isFormSubmittable}
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                !isAppInitiatedAction && "kcButtonBlockClass",
                                "kcButtonLargeClass"
                            )}
                            type="submit"
                            value={msgStr("doSubmit")}
                        />
                        {isAppInitiatedAction && (
                            <button
                                className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                                type="submit"
                                name="cancel-aia"
                                value="true"
                                formNoValidate
                            >
                                {msg("doCancel")}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}
