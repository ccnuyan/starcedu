import paramsValidator from '../api/paramsValidator';

const init = () => {
  $(document)
  .ready(() => {
    // form validation
    $('.ui.form')
      .form({
        fields: {
          email: {
            identifier: 'email',
            rules: [
              {
                type: 'empty',
                prompt: '请输入E-mail',
              },
              {
                type: 'regExp',
                value: paramsValidator.validationRules.username.regex,
                prompt: '请输入有效的 E-mail',
              },
            ],
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'empty',
                prompt: '请输入6-20位密码',
              },
              {
                type: 'regExp',
                value: paramsValidator.validationRules.password.regex,
                prompt: '密码长度在6~20之间，只能包含大小写字母和数字',
              },
            ],
          },
          old_password: {
            identifier: 'old_password',
            rules: [
              {
                type: 'empty',
                prompt: '请输入6-18位密码',
              },
              {
                type: 'regExp',
                value: paramsValidator.validationRules.password.regex,
                prompt: '密码长度在6~20之间，只能包含大小写字母和数字',
              },
            ],
          },
          new_password: {
            identifier: 'new_password',
            rules: [
              {
                type: 'empty',
                prompt: '请输入6-18位密码',
              },
              {
                type: 'regExp',
                value: paramsValidator.validationRules.password.regex,
                prompt: '密码长度在6~20之间，只能包含大小写字母和数字',
              },
            ],
          },
          confirm_password: {
            identifier: 'confirm_password',
            rules: [
              {
                type: 'empty',
                prompt: '请再次输入密码确认',
              },
              {
                type: 'match[password]',
                prompt: '两次输入密码应该保持一致',
              },
            ],
          },
          confirm_new_password: {
            identifier: 'confirm_new_password',
            rules: [
              {
                type: 'empty',
                prompt: '请再次输入新密码确认',
              },
              {
                type: 'match[new_password]',
                prompt: '两次输入的新密码应该保持一致',
              },
            ],
          },
        },
      });
  });
};


export default init;
