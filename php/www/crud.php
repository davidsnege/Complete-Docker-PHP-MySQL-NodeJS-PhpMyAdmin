<!DOCTYPE html>
<html>
<head>
    <title>CRUD Test PHP</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        .form-group { margin: 10px 0; }
        .btn { padding: 5px 10px; margin: 5px; }
        select { padding: 5px; width: 200px; }
    </style>
</head>
<body>
    <?php include 'get_users.php'; ?>

    <h2>Create User</h2>
    <form action="create.php" method="POST">
        <div class="form-group">
            <label>Name:</label>
            <input type="text" name="name" required>
        </div>
        <div class="form-group">
            <label>Email:</label>
            <input type="email" name="email" required>
        </div>
        <div class="form-group">
            <label>Password:</label>
            <input type="password" name="pwd" required>
        </div>
        <button type="submit" class="btn">Create</button>
    </form>

    <h2>Update User</h2>
    <form action="update.php" method="POST">
        <div class="form-group">
            <label>Select User:</label>
            <select name="id" required onchange="fillUserData(this.value)">
                <option value="">Select a user...</option>
                <?php
                $users = getUsersList();
                foreach($users as $user) {
                    echo "<option value='" . $user['id'] . "'>" . htmlspecialchars($user['name']) . "</option>";
                }
                ?>
            </select>
        </div>
        <div class="form-group">
            <label>New Name:</label>
            <input type="text" name="name" required>
        </div>
        <div class="form-group">
            <label>New Email:</label>
            <input type="email" name="email" required>
        </div>
        <div class="form-group">
            <label>New Password:</label>
            <input type="password" name="pwd">
            <small>(Leave empty to keep current password)</small>
        </div>
        <button type="submit" class="btn">Update</button>
    </form>

    <h2>Delete User</h2>
    <form action="delete.php" method="POST">
        <div class="form-group">
            <label>Select User:</label>
            <select name="id" required>
                <option value="">Select a user to delete...</option>
                <?php
                foreach($users as $user) {
                    echo "<option value='" . $user['id'] . "'>" . htmlspecialchars($user['name']) . "</option>";
                }
                ?>
            </select>
        </div>
        <button type="submit" class="btn" onclick="return confirm('Are you sure you want to delete this user?');">Delete</button>
    </form>

    <h2>Read Users</h2>
    <button onclick="window.location.href='read.php'" class="btn">View All Users</button>

    <script>
    function fillUserData(userId) {
        if (userId) {
            fetch('get_user_data.php?id=' + userId)
                .then(response => response.json())
                .then(data => {
                    document.querySelector('form[action="update.php"] input[name="name"]').value = data.name;
                    document.querySelector('form[action="update.php"] input[name="email"]').value = data.email;
                });
        }
    }
    </script>
</body>
</html>