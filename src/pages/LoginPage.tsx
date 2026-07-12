import LoginForm from '@/components/UI/Forms/LoginForm/LoginForm.tsx';

const LoginPage = () => {
    return (
        <main
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <LoginForm />
        </main>
    );
};

export default LoginPage;
