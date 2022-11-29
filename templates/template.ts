import adminNotifyTemplate from "./admin.notify.template";
import passwordResetTemplate from "./password.reset.template";
import verifyTemplate from "./verify.template"

const template = {
    // verify template
    verify: verifyTemplate,
    // admin notify template
    passwordReset: passwordResetTemplate,
    // admin notify template
    adminNotify: adminNotifyTemplate,
}

export default template;