<!-- resources/views/login.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/quasar@2.0.0/dist/quasar.min.css" rel="stylesheet">
    <style>
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f5f5f5;
        }
        .login-container {
            max-width: 400px;
            width: 100%;
        }
        .login-image {
            display: block;
            margin: 0 auto 20px;
            max-width: 100px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <img src="path/to/your/image.jpg" alt="Login Image" class="login-image">
        <div class="q-pa-md q-gutter-md">
            <div class="q-card q-pa-md q-mx-auto">
                <div class="q-card-section">
                    <div class="text-h6">Login</div>
                </div>
                <div class="q-card-section">
                    <form method="POST" action="{{ route('api.vue.store') }}">
                        @csrf
                        <div class="q-field q-mb-md">
                            <label for="email" class="q-field__label">Email:</label>
                            <input type="email" class="q-field__native q-input" id="email" name="email" required>
                        </div>
                        <div class="q-field q-mb-md">
                            <label for="password" class="q-field__label">Password:</label>
                            <input type="password" class="q-field__native q-input" id="password" name="password" required>
                        </div>
                        <button type="submit" class="q-btn q-btn--standard q-btn--primary q-mt-md">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/quasar@2.0.0/dist/quasar.umd.min.js"></script>
</body>
</html>
