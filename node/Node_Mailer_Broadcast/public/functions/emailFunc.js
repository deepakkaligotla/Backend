var composeEmailButton = document.getElementById('composeEmailButton');
var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
var endpoint

modal._element.addEventListener('show.bs.modal', function () {
  composeEmailButton.innerHTML = `
            <button type="button" class="btn btn-warning me-1" onclick="maximizeModal()">Minimize</button>
        `;
});

modal._element.addEventListener('hidden.bs.modal', function () {
  composeEmailButton.innerHTML = `Compose New Email`;
});

function minimizeModal() {
  if (modal._element.classList.contains('minimized')) {
    modal._element.classList.remove('minimized');
    modal._element.querySelector('.modal-dialog').classList.remove('modal-sm');
  } else {
    modal._element.classList.add('minimized');
    modal._element.querySelector('.modal-dialog').classList.add('modal-sm');
  }
}

function clearForm() {
  document.getElementById("toRecepients").value = "";
  document.getElementById("ccRecepients").value = "";
  document.getElementById("bccRecepients").value = "";
  tinymce.activeEditor.setContent("");
  document.getElementById("attachments").value = "";
}

function handleFileSelect(event) {
  const input = event.target;
  if ('files' in input && input.files.length > 0) {
    const files = input.files;

    for (let i = 0; i < files.length; i++) {
      console.log(files[i].name);
    }
  }
}

function sendEmail() {
  const to = document.getElementById("toRecepients").value;
  const cc = document.getElementById("ccRecepients").value;
  const bcc = document.getElementById("bccRecepients").value;

  const emailBody = tinymce.activeEditor.getContent();

  const input = document.getElementById("attachments");
  const files = input.files;

  const formData = new FormData();
  formData.append('to', to);
  formData.append('cc', cc);
  formData.append('bcc', bcc);
  formData.append('emailBody', emailBody);

  for (let i = 0; i < files.length; i++) {
    formData.append('attachments', files[i]);
  }

  if (document.getElementById("fromSender").value.includes('gmail') && input.files.length == 0)
    endpoint = "http://localhost/send_email_with_attachments_from_gmail";

  if (document.getElementById("fromSender").value.includes('kaligotla.in') && input.files.length == 0)
    endpoint = "http://localhost/send_email_with_attachments_from_gmail";

  if (document.getElementById("fromSender").value.includes('gmail') && input.files.length > 0)
    endpoint = "http://localhost/send_email_with_attachments_from_gmail";

  if (document.getElementById("fromSender").value.includes('kaligotla.in') && input.files.length > 0)
    endpoint = "http://localhost/send_email_with_attachments_from_gmail";

  axios.post(endpoint, formData)
    .then(response => {
      clearForm();
      $('#exampleModal').modal('hide');
      alert('Email sent successfully!');
    })
    .catch(error => {
      alert('Failed to send email. Please try again.');
    });
}

tinymce.init({
  selector: '#emailBody',
  plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  imagetools_cors_hosts: ['picsum.photos'],
  menubar: 'file edit view insert format tools table help',
  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
  toolbar_sticky: true,
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m',
  image_advtab: true,
  link_list: [
    { title: 'My page 1', value: 'https://www.tiny.cloud' },
    { title: 'My page 2', value: 'http://www.moxiecode.com' }
  ],
  image_list: [
    { title: 'My page 1', value: 'https://www.tiny.cloud' },
    { title: 'My page 2', value: 'http://www.moxiecode.com' }
  ],
  image_class_list: [
    { title: 'None', value: '' },
    { title: 'Some class', value: 'class-name' }
  ],
  importcss_append: true,
  file_picker_callback: function (callback, value, meta) {
    if (meta.filetype === 'file') {
      callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
    }

    if (meta.filetype === 'image') {
      callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
    }

    if (meta.filetype === 'media') {
      callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
    }
  },
  templates: [
    { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
    { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
    { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
  ],
  template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
  template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
  height: 600,
  image_caption: true,
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  noneditable_noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link image imagetools table',
  skin: useDarkMode ? 'oxide-dark' : 'oxide',
  content_css: useDarkMode ? 'dark' : 'default',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});