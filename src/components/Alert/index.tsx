import Swal, { SweetAlertIcon } from 'sweetalert2';

export const showAlert = (
  title: string,
  text: string,
  icon: SweetAlertIcon = 'warning',
  confirmCallback?: () => void
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    background: '#1f2937',
    color: '#f9fafb',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed && confirmCallback) {
      confirmCallback();
    }
  });
};
