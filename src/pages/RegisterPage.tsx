import RegisterForm from '@/components/UI/Forms/RegisterForm/RegisterForm.tsx';

const RegisterPage = () => {
    return (
        <main
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <RegisterForm />
        </main>
    );
};

export default RegisterPage;
