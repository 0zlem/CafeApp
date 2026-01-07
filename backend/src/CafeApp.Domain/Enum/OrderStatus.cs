namespace CafeApp.Domain.Enum
{
    public enum OrderStatus
    {
        Created = 0,     // Sipariş oluşturuldu
        Preparing = 1,    // Hazırlanıyor
        Ready = 2,       // Hazır
        Served = 3,     // Servis edildi
        Cancelled = 4,  // İptal edildi
        Paid = 5      // Ödendi
    }
}