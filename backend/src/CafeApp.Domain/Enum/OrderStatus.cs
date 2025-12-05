namespace CafeApp.Domain.Enum
{
    public enum OrderStatus
    {
        Created,      // Sipariş oluşturuldu
        Preparing,    // Hazırlanıyor
        Ready,        // Hazır
        Served,       // Servis edildi
        Cancelled,    // İptal edildi
        Paid          // Ödendi
    }

}