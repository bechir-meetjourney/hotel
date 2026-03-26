<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>رمز التحقق</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Segoe UI',Tahoma,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
        <tr>
            <td align="center">
                <table width="500" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(135deg,#01004C,#5A5ECD);padding:32px;text-align:center;">
                            <h1 style="color:#fff;font-size:28px;margin:0;">ضيافة</h1>
                            <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:8px 0 0;">Diyafah</p>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding:32px;">
                            <p style="font-size:16px;color:#333;margin:0 0 8px;">
                                مرحباً <strong>{{ $userName }}</strong>،
                            </p>
                            <p style="font-size:14px;color:#666;margin:0 0 24px;">
                                استخدم الرمز التالي لتأكيد بريدك الإلكتروني:
                            </p>

                            <!-- OTP Code -->
                            <div style="text-align:center;margin:24px 0;">
                                <div style="display:inline-block;background:#f0f1ff;border:2px dashed #5A5ECD;border-radius:12px;padding:16px 40px;">
                                    <span style="font-size:36px;font-weight:bold;letter-spacing:12px;color:#01004C;">{{ $otpCode }}</span>
                                </div>
                            </div>

                            <p style="font-size:13px;color:#999;text-align:center;margin:24px 0 0;">
                                هذا الرمز صالح لمدة <strong>10 دقائق</strong> فقط.
                            </p>
                            <p style="font-size:13px;color:#999;text-align:center;">
                                إذا لم تطلب هذا الرمز، تجاهل هذا البريد.
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #eee;">
                            <p style="font-size:12px;color:#aaa;margin:0;">
                                &copy; {{ date('Y') }} Diyafah — نظام إدارة الفنادق
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
