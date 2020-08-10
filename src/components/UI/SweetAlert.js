import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import parser from 'html-react-parser';
const MySwal = withReactContent(Swal);

const SweetAlert = async (title, content, type) => {

  try {
    const result = await MySwal.fire({
      type: type,
      title: title,
      html: parser(content),
    
    });

    if (type === 'warning' && result.value) {
      console.log('warning');
    } else return;

  } catch (error) {
    console.log(error);
  }
}

export default SweetAlert;