# Sweet Paradise Backend (Flask)

This simple Flask app provides two endpoints used by the frontend:

- `GET /api/products` - returns product list
- `POST /api/order` - accepts an order JSON and stores it in SQLite

Quick start (Windows):

1. Open a terminal in `e:\sweet shop\backend`
2. (Optional) create and activate a virtual env

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

3. Install requirements

```powershell
pip install -r requirements.txt
```

4. Run the app

```powershell
python app.py
```

The API will run at `http://127.0.0.1:5000`.

Note: configure SMTP/email in `app.py` if you want email confirmations.
